import { Temporal } from 'temporal-polyfill';
import type { RefreshSessionRepository } from '../domain/refreshSession/repository';
import type { UserRepository } from '../domain/auth/repository';
import { hashPassword, verifyPassword } from '../lib/hashpassword';
import type {
	PasswordHash,
	PublicUser,
	TokenService,
	UserInput,
} from './auth.types';
import { config } from '../config';

export function UserServices(
	repository: UserRepository,
	hasher: PasswordHash,
	tokenService: TokenService,
	refreshSessionRepository: RefreshSessionRepository,
) {
	return {
		async findByEmail(email: string) {
			const user = await repository.findByEmail(email);
			if (!user) {
				return undefined;
			}
			const { hashPassword, ...publicUser } = user;
			return publicUser as PublicUser;
		},
		async register(input: UserInput) {
			const existingUser = await repository.findByEmail(input.email);
		
			if (existingUser) {
				throw new Error('409');
			}
		
			const passwordHash = await hasher.hash(input.password);
		
			return await repository.createUser({
				email: input.email,
				hashPassword: passwordHash,
			});
		},
		async login(input: UserInput) {
			const email = input.email.trim().toLowerCase();
			const user = await repository.findByEmail(email);
			if (!user || !(await verifyPassword(input.password, user.hashPassword))) {
				throw new Error('INVALID_CREDENTIALS');
			}

			const refreshToken = tokenService.signRefreshToken(user.id);
			const hashRefreshToken = tokenService.hash(refreshToken);

			await refreshSessionRepository.create({
				userId: user.id,
				expiresAt: Temporal.Now.instant().add({ seconds: 7 * 24 * 60 * 60 }),
				tokenHash: hashRefreshToken,
			});

			return {
				user: { id: user.id, email: user.email },
				accessToken: tokenService.signAccessToken(user.id),
				refreshToken: tokenService.signRefreshToken(user.id),
			};
		},
		async refresh(refreshToken: any) {
			const userId = tokenService.verifyRefreshToken(refreshToken);
			const refreshHash = tokenService.hash(refreshToken);
			const getByHash = await refreshSessionRepository.getByHash(refreshHash);
			if (
				!getByHash ||
				getByHash.userId !== userId ||
				getByHash.expiresAt.epochMilliseconds < Date.now()
			) {
				throw new Error('INVALID_USERID_OR_HASH_HAS_EXPIRED');
			}
			const user = await repository.getById(userId);
			if (!user) throw new Error('INVALID_REFRESH_TOKEN');
			const newRefreshToken = tokenService.signRefreshToken(user.id);
			await refreshSessionRepository.rotate(
				refreshHash,
				tokenService.hash(newRefreshToken),
				new Date(Date.now() + config.tokenRefreshTime),
			);
			return {
				accessToken: tokenService.signAccessToken(user.id),
				refreshToken: newRefreshToken,
			};
		},
		async me(id: number) {
			const user = await repository.getById(id);
			if (!user) {
				return null;
			}
			const { hashPassword, ...publicUser } = user;
			return publicUser;
		},
		async logout(token: string | undefined) {
			if (!token) {
				return;
			}
			const hash = tokenService.hash(token);
			await refreshSessionRepository.deleteByHash(hash);
		},
	};
}


// Тут мне страшно даже пытаться понять как это работает.
// Заменил некоторые expiresAT на те, что value в конфиге. Вроде все.