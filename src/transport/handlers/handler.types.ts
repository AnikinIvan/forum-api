import type { Request, Response } from 'express'


export interface PostHandlerTypes {
    getAllPostsHandler: (req:Request, res:Response) => Promise<void>,
    getPostByIdHandler: (req:Request, res:Response) =>  Promise<void>,
    addPostHandler:(req:Request, res:Response) =>  Promise<void>
}
