import express from 'express';
import { PostRepositories } from './repositories/post.js';
import { PostServices } from './services/post.js';
import { PostHandler } from './transport/handlers/post.js';
import { PostRouter } from './transport/routers/post.js';
import { UserRouter } from './transport/routers/user.js';
import { UserHandler } from './transport/handlers/user.js';
import { UserServices } from './services/user.js';
import { UserRepositories } from './repositories/user.js';
import { db } from './prisma/db.js';
import type { PasswordHash } from './services/user.types.js';
import { hashPassword, verifyPassword } from './lib/hashpassword.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from './lib/jwt.js'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = 3000

const passwordHash: PasswordHash = {
    hash: hashPassword,
    verify: verifyPassword,
}

const repository = PostRepositories()
const service = PostServices(repository)
const handlers = PostHandler(service)
const router = PostRouter(handlers)

const userRepository = UserRepositories(db)
const userService = UserServices(userRepository, passwordHash, {signAccessToken, signRefreshToken, verifyRefreshToken})
const userHandlers = UserHandler(userService)
const userRouter = UserRouter(userHandlers)

app.use(express.json())
app.use(cookieParser())
app.use('/posts', router)
app.use('/user', userRouter)


app.listen(PORT, () => {
    console.log(`Сервер работает.`);
});