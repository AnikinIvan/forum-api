import type { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../lib/jwt.js'

export function requireAuth() {
    return (req: Request, res: Response, next:NextFunction) => {
        const { accessToken } = req.cookies
        console.log('cookies:', req.cookies)
        if (!accessToken) {
            res.status(401).json("Ви неавторизовані.")
            return
        }
        const userId = verifyAccessToken(accessToken)
        res.locals.userId = userId
        next()
    }
}

