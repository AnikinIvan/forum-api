import express from 'express'
import type { UserHandlerTypes } from '../handlers/user.types.js'

export function UserRouter(handlers:UserHandlerTypes){
    const userRouter = express.Router()
    userRouter.post('/register', handlers.createUserHandler)
    userRouter.get('/:email', handlers.findByEmailHandler)      
    userRouter.post('/login', handlers.login)
    return userRouter
}



