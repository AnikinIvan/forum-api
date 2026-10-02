import express from 'express'
import type { PostHandlerTypes } from '../handlers/handler.types.js'

export function PostRouter(handlers:PostHandlerTypes){

    const router = express.Router()

    router.get('/', handlers.getAllPostsHandler)      
    router.get('/:id', handlers.getPostByIdHandler)  
    router.post('/', handlers.addPostHandler)

    return router
}



