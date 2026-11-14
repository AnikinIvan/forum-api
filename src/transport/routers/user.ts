import express from 'express'
import type { UserHandlerTypes } from '../handlers/user.types.js'
import { requireAuth } from '../../middlewares/requireAuth.js'

export function UserRouter(handlers:UserHandlerTypes){
    const userRouter = express.Router()
    userRouter.post('/register', handlers.RegisterHandler)
    userRouter.get('/me', requireAuth(), handlers.me)
    userRouter.get('/refresh', handlers.refresh)
    userRouter.get('/:email', handlers.findByEmailHandler)      
    userRouter.post('/login', handlers.login)
    return userRouter
}



