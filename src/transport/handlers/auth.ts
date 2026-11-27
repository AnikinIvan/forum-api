import type { Request, Response } from 'express';
import type { UserService } from '../../services/auth.types';
import type { AuthCredentialsRequest } from '../dto/requests.js';
import type { UserHandlerTypes } from './auth.types';
import { config } from '../../config';

export interface AuthHandlers {
	register(
		req: Request<{}, {}, AuthCredentialsRequest>,
		res: Response,
	): Promise<void>;
	login(
		req: Request<{}, {}, AuthCredentialsRequest>,
		res: Response,
	): Promise<void>;
	refresh(req: Request, res: Response): Promise<void>;
}

export function createUserHandler(services: UserService): UserHandlerTypes {
	return {
		async findByEmailHandler(req, res) {
			try {
				const { email } = req.params;
				if (typeof email !== 'string' || email.trim().length < 1) {
					res
						.status(400)
						.json('Для пошуку користувачу введіть його email текстом.');
					return;
				}
				const user = await services.findByEmail(email);
				res.status(200).json(user);
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: 'internal server error' });
			}
		},
		async RegisterHandler(req, res) {
			try {
				const { email, password } = req.body;

				if (typeof email !== 'string' || email.trim().length < 1) {
					res.status(400).json('email користувачу має бути у форматі тексту.');
					return;
				}
				if (typeof password !== 'string') {
					res.status(400).json('пароль має бути у форматі тексту / числа.');
					return;
				}

				const user = await services.register({ email, password });

				res.status(201).json(user.email);
			} catch (error) {
				if (error instanceof Error && error.message === '409') {
					res.status(409).json({ message: 'Цей email вже зайнятий.' });
					return;
				}
				console.error(error);
				res.status(500).json('internal server error');
			}
		},
		async login(req, res) {
			try {
				const { email, password } = req.body;
				const result = await services.login({ email, password });
				res.cookie('accessToken', result.accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: Number(config.tokenAccessTime),
					path: '/',
				});
				res.cookie('refreshToken', result.refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: Number(config.tokenRefreshTime),
					path: '/',
				});
				res.status(200).json({ user: result.user });
			} catch (error) {
				if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
					res.status(401).json({ message: 'Invalid credentials' });
					return;
				}
				console.error(error);
				res.status(500).json({ message: 'Internal server error' });
			}
		},
		async refresh(req, res) {
			try {
				const refreshToken = req.cookies.refreshToken;
				if (!refreshToken) {
					res.status(401).json({ message: 'No refresh token' });
					return;
				}
				const result = await services.refresh(refreshToken);
				res.cookie('accessToken', result.accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: Number(config.tokenAccessTime),
					path: '/',
				});
				res.cookie('refreshToken', result.refreshToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax',
					maxAge: Number(config.tokenRefreshTime),
					path: '/auth',
				});
				res.status(200).json({ message: 'Tokens refreshed' });
			} catch (error) {
				res.status(500).json('Internal Server Error');
				console.log(error);
			}
		},
		async me(req, res) {
			try {
				const userId = res.locals.userId;
				console.log('userId:', userId);
				const result = await services.me(userId);
				res.status(200).json(result);
			} catch (error) {
				res.status(500).json('Internal Server Error');
				console.log(error);
			}
		},
		async logout(req, res) {
			const token = req.cookies?.refreshToken;
			try {
				if (!token) {
					res.status(401).json({ message: 'Unauthorized' });
					return;
				}
				await services.logout(token);
				res.clearCookie('accessToken', {
					httpOnly: true,
					sameSite: 'lax',
					path: '/',
				});
				res.clearCookie('refreshToken', {
					httpOnly: true,
					sameSite: 'lax',
					path: '/',
				});
				res.status(200).json('Logged out');
			} catch (error) {
				res.status(500).json('Internal Server Error');
				console.log(error);
			}
		},
	};
}

// Комментарий :
// Тут все maxAge изменил на value конфига. Вроде все.