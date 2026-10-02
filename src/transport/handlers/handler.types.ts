import type { RequestHandler } from 'express'

export interface PostHandlerTypes {
    getAllPostsHandler: RequestHandler,
    getPostByIdHandler: RequestHandler,
    addPostHandler: RequestHandler
}

// Тут использовал Клод. Я не знал, что такое
// RequestHandler, и без него было много ошибок в handlers. 
// Я не уверен, что мы использовали его
// на уроках, может не записал и забыл.