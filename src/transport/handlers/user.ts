import type {Request, Response} from 'express'
import type { UserService } from '../../services/user.types'
import type { UserHandlerTypes } from './user.types'


export function UserHandler(services:UserService):UserHandlerTypes{
    return{
        async findByEmailHandler(req:Request, res:Response){
            try{
                const {email} = req.params
                if(typeof email !== 'string' || email.trim().length < 1){
                    res.status(400).json('Для пошуку користувачу введіть його email текстом.')
                    return
                }
                const user = await services.findByEmail(email)
                res.status(200).json(user)

            }catch(error){
                console.error(error)
                res.status(500).json({error:'internal server error'})
            }
        },
        async createUserHandler(req:Request, res:Response){
            try{
        
                const {email, password} = req.body
        
                if (typeof email !== 'string' || email.trim().length < 1){
                    res.status(400).json('email користувачу має бути у форматі тексту.')
                    return 
                }
                if (typeof password !== 'string'){
                    res.status(400).json('пароль має бути у форматі тексту / числа.')
                    return 
                }

                const user = await services.register({email, password})
        
                res.status(201).json(user.email)
        
            }catch(error){
                console.error(error)
                res.status(500).json('internal server error')
            }
        }  
    }
}