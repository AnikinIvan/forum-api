import type { Request, Response } from 'express'


export interface UserHandlerTypes {
    RegisterHandler: (req:Request, res:Response) => Promise<void>,
    findByEmailHandler:(req:Request, res:Response) => Promise<void>,
    login: (req: Request, res: Response) => Promise<void>,
    refresh: (req: Request, res: Response) => Promise<void>,
    me:(req:Request, res:Response) => Promise<void>
}
