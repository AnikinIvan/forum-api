import type { PostServicesTypes } from '../../services/post.types.js';
import type {Request, Response} from 'express'
import type { PostHandlerTypes } from './handler.types.js';

export function PostHandler(services:PostServicesTypes):PostHandlerTypes{
    return{
        async getAllPostsHandler(req:Request, res:Response){
            try{
                const category = req.query.category as string | undefined
                const take = req.query.take as string | undefined 
                if(Number(take) > 2){
                    let takeError = res.status(404).json({error:'not found'})
                    return
                }
                const posts = services.getAllPostsServices(category, take)
                
                res.status(200).json(posts)
                
            }catch(error){
                res.status(500).json({error:'internal server error'})
            }
        },
        
        async getPostByIdHandler(req:Request, res:Response){
            try{
                let id = Number(req.params)
                if(!id){
                    let idError = res.status(400).json({error:'id має бути цілим числом'})
                    return 
                }
        
                const post = services.getPostByIdServices(id)
               
                res.status(200)

            }catch(error){
                res.status(500).json({error:'internal server error'})
            }
        
        },
        
        async addPostHandler(req:Request,res:Response){
            try{
        
                const {title, content, author, category} = req.body
        
                if (typeof title !== 'string' || title.trim().length < 1){
                    res.status(400).json('title посту має бути текстом')
                    return 
                }
                if (typeof content !== 'string' || content.trim().length < 1){
                    res.status(400).json('content посту має бути текстом')
                    return 
                }
                if (typeof author !== 'string' || author.trim().length < 1){
                    res.status(400).json('author посту довжен мати текстовий нікнейм')
                    return 
                }
                if (typeof category !== 'string' || category.trim().length < 1){
                    res.status(400).json('category посту довжен мати текстовий нікнейм')
                    return
                }
                if (!title || !author || !content || !category){
                    res.status(422).json('один із параметрів посту є незаповненим')
                    return 
                }
                const post = await services.addPostServices({title, content, author, category})
        
                res.status(201).json(post)
        
            }catch(error){
                console.error(error)
                res.status(500).json('internal server error')
            }
        }
    }
}
