import type { PostgresClient } from "@prisma/orm-postgres/runtime";
import type { RefreshSessionRepository } from "../domain/refreshSession/repository.js";
import type { Contract } from "../prisma/contract.d.js";



export function createRefreshSessionRepository(database: PostgresClient<Contract>): RefreshSessionRepository {
    return {
        async create(data) {
            await database.orm.public.RefreshSession.create(data);
        },
        async getByHash(hash) {
            return database.orm.public.RefreshSession.where({ tokenHash: hash }).first();
        },
        async rotate(oldHash, newHash, expiresAt) {
            const updated = await database.orm.public.RefreshSession.where({ tokenHash: oldHash }).update({ tokenHash: newHash, expiresAt });
            return updated !== null;
        },
        async deleteByHash(hash) {
            await database.orm.public.RefreshSession.where({ tokenHash: hash }).delete();
        },
    };
}
