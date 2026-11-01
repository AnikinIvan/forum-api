import type { User } from "../domain/user/entity.js";

export interface UserInput {
    email: string
    password: string
}
export interface UserService {
    refresh(refreshToken: any):Promise<{accessToken: string;refreshToken: string;}>;
    findByEmail(email: string): unknown;
    register(input: UserInput): Promise<User>;
    login(input: UserInput): Promise<{user: { id: number; email: string }; accessToken: string; refreshToken: string;}>;
}

export interface PasswordHash {
    hash(password: string): Promise<string>
    verify(password: string, hash: string): Promise<boolean>
}

export interface TokenService {
    signRefreshToken(id: any): string;
    verifyRefreshToken(refreshToken: string): number;
    signAccessToken(userId: number): string;
}

export type PublicUser = Omit<User, 'hashPassword'>
