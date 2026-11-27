import type { User } from '../domain/auth/entity.js';

export interface UserInput {
	email: string;
	password: string;
}
export interface UserService {
	refresh(
		refreshToken: any,
	): Promise<{ accessToken: string; refreshToken: string }>;
	findByEmail(email: string): unknown;
	register(input: UserInput): Promise<User>;
	login(
		input: UserInput
	): Promise<{
		user: { id: number; email: string };
		accessToken: string;
		refreshToken: string;
	}>;
	me(id: number): Promise<PublicUser | null>;
	logout(hash: string): Promise<void>;
}

export interface PasswordHash {
	hash(password: string): Promise<string>;
	verify(password: string, hash: string): Promise<boolean>;
}

export interface TokenService {
	signRefreshToken(id: any): string;
	verifyRefreshToken(refreshToken: string): number;
	signAccessToken(userId: number): string;
	hash(token: string): string; // вот это было в tokenHash
}

export type PublicUser = Omit<User, 'hashPassword'>;

//Комментарий :
// Тут был тип TokenHash, его я снес и типизацию закинул в tokenService.
// Вроде все.