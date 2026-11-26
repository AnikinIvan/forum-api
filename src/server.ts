import 'temporal-polyfill/global'
import express from 'express';
import cors from 'cors'
import { PostRepositories } from './repositories/post.js';
import { PostServices } from './services/post.js';
import { PostHandler } from './transport/handlers/post.js';
import { PostRouter } from './transport/routers/post.js';
import { UserRouter } from './transport/routers/user.js';
import { createUserHandler } from './transport/handlers/user.js';
import { UserServices } from './services/user.js';
import { UserRepositories } from './repositories/user.js';
import { db } from './prisma/db.js';
import type { PasswordHash } from './services/user.types.js';
import { hashPassword, verifyPassword } from './lib/hashpassword.js';
import { hashRefreshToken, signAccessToken, signRefreshToken, verifyRefreshToken } from './lib/jwt.js'
import cookieParser from 'cookie-parser'
import { createRefreshSessionRepository } from './repositories/refreshSession.js';


const app = express()
const PORT = 3000
app.use(cookieParser())

const passwordHash: PasswordHash = {
    hash: hashPassword,
    verify: verifyPassword,
}

const repository = PostRepositories()
const service = PostServices(repository)
const handlers = PostHandler(service)
const router = PostRouter(handlers)
const userRepository = UserRepositories(db)
const refreshSessionRepository = createRefreshSessionRepository(db)
const userService = UserServices(userRepository, passwordHash, { signAccessToken, signRefreshToken, verifyRefreshToken },refreshSessionRepository,{ hash: hashRefreshToken })
const userHandler = createUserHandler(userService)
const userRouter = UserRouter(userHandler)

app.use(express.json())
app.use(cors({origin:'http://localhost:5173', credentials:true}))
app.use('/posts', router)
app.use('/user', userRouter)


app.listen(PORT, () => {
    console.log(`Сервер работает.`);
});

function hashToken(token: string): string {
    throw new Error('Function not implemented.');
}
