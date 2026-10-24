import type { UserRepository } from "../domain/user/repository"
import type { PostgresClient } from "@prisma/orm-postgres/runtime"
import type { Contract } from "../prisma/contract"


export function UserRepositories(db:PostgresClient<Contract>):UserRepository{
    return{
        async findByEmail(email){
            return await db.orm.public.User.where({email}).first()
        },
        async createUser(user){
            return await db.orm.public.User.create(user)
        }
    }
}