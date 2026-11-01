import type { UserRepository } from "../domain/user/repository";
import { hashPassword, verifyPassword } from "../lib/hashpassword";
import type { PasswordHash, PublicUser, UserInput, TokenService} from "./user.types";

export function UserServices(repository:UserRepository, hasher:PasswordHash, tokenService:TokenService){
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
            const email = input.email.trim().toLowerCase();
				const user = await repository.findByEmail(email);
				if (!user || !(await verifyPassword(input.password, user.hashPassword))) {
					throw new Error("INVALID_CREDENTIALS");
				}
				return {
					user: { id: user.id, email: user.email },
					accessToken: tokenService.signAccessToken(user.id),
					refreshToken: tokenService.signRefreshToken(user.id),
				};
        },
        async refresh(refreshToken: any) {
            const userId = tokenService.verifyRefreshToken(refreshToken)
            const user = await repository.getById(userId)
            if (!user) throw new Error("INVALID_REFRESH_TOKEN")
            return {
                accessToken: tokenService.signAccessToken(user.id),
                refreshToken: tokenService.signRefreshToken(user.id)
            }
        },
    }
}