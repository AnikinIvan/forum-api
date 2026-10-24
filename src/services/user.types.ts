import type { User } from "../domain/user/entity.js";

export interface UserInput {
    email: string
    password: string
}
export interface UserService {
    findByEmail(email: string): unknown;
    register(input: UserInput): Promise<User>;
    login(input: UserInput): Promise<void>;
}

export interface PasswordHash {
    hash(password: string): Promise<string>
    verify(password: string, hash: string): Promise<boolean>
}

export type PublicUser = Omit<User, 'hashPassword'>
