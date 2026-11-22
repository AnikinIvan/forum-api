import { Temporal } from 'temporal-polyfill'

export interface refreshSession{
    id: number;
    userId: number;
    tokenHash: string;
    expiresAt: Temporal.Instant;
    createdAt: Temporal.Instant;
}