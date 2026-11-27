import type { refreshSession } from './entity.js';

export type NewRefreshSession = Pick<
	refreshSession,
	'userId' | 'tokenHash' | 'expiresAt'
>;

export interface RefreshSessionRepository {
	create(data: NewRefreshSession): Promise<void>;
	getByHash(hash: string): Promise<refreshSession | null>;
	rotate(oldHash: string, newHash: string, expiresAt: Date): Promise<boolean>;
	deleteByHash(hash: string): Promise<void>;
}
