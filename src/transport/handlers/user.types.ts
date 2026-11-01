import type { Request, Response } from 'express'


export interface UserHandlerTypes {
    createUserHandler: (req:Request, res:Response) => Promise<void>,
    findByEmailHandler:(req:Request, res:Response) => Promise<void>,
}
