import 'dotenv/config';
import { createHash, randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config';


export function createJwt(){
	const accessSecret = process.env.JWT_ACCESS_SECRET;
	if (!accessSecret) throw new Error('JWT_ACCESS_SECRET required');

	const refreshSecret = process.env.JWT_REFRESH_SECRET;
	if (!refreshSecret) throw new Error('JWT_REFRESH_SECRET required');

	return{
		signAccessToken(userId: number): string {
			return jwt.sign({}, accessSecret!, {
				algorithm: 'HS256',
				subject: String(userId),
				expiresIn: config.tokenAccessTime,
			});
		},
		signRefreshToken(userId: number): string {
			return jwt.sign({ type: 'refresh' }, refreshSecret!, {
				algorithm: 'HS256',
				subject: String(userId),
				expiresIn: config.tokenRefreshTime,
			});
		},
		hash(token: string): string {
			return createHash('sha256').update(token).digest('hex');
		},
		verifyRefreshToken(token: string): number {
			const payload = jwt.verify(token, refreshSecret!, { algorithms: ['HS256'] });
			if (typeof payload === 'string' || typeof payload.sub !== 'string') {
				throw new Error();
			}
			const userId = Number(payload.sub);
			if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error();
		
			return userId;
		},
		verifyAccessToken(token: string): number {
			const payload = jwt.verify(token, accessSecret!, { algorithms: ['HS256'] });
			if (typeof payload === 'string' || typeof payload.sub !== 'string') {
				throw new Error();
			}
			const userId = Number(payload.sub);
			if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error();
		
			return userId;
		}
	}
}

// Комментарий : 
// Тут я сделал функцию фабрику, и заменил некоторые ExpiresAt на value из конфига.
// Вроде все.


