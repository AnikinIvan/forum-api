import type { UserRepository } from "../domain/user/repository";
import { hashPassword } from "../lib/hashpassword";
import type { PasswordHash, PublicUser, UserInput } from "./user.types";

export function UserServices(repository:UserRepository, hasher:PasswordHash){
    return{
        async findByEmail(email:string){
            const user = await repository.findByEmail(email)
            if (!user){
                return undefined
            }
            const { hashPassword, ...publicUser } = user
            return publicUser as PublicUser
        },
        async register(input:UserInput){
            const passwordHash = await hasher.hash(input.password)
                return await repository.createUser({
                    email: input.email,
                    hashPassword: passwordHash
                })
        },
        async login(input:UserInput){
            const user = await repository.findByEmail(input.email)
            if (!user){
                throw new Error("404")
            }
            await hasher.verify(input.password, user.hashPassword)
        }
    }
}