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
                const posts = await services.getAllPostsServices(category, take)
                
                res.status(200).json(posts)
                
            }catch(error){
                console.error(error)
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
        
                const post = await services.getPostByIdServices(id)
               
                res.status(200)

            }catch(error){
                res.status(500).json({error:'internal server error'})
            }
        
        },
        
        async addPostHandler(req: Request, res: Response) {
            try {
                const { title, content, category } = req.body;
                const authorId = Number(res.locals.userId);
        
                if (typeof authorId !== 'number') {
                    res.status(401).json({ error: 'Ви неавторизовані.' });
                    return;
                }
        
                if (typeof title !== 'string' || !title.trim()) {
                    res.status(400).json({ error: 'Title має бути текстом.' });
                    return;
                }
        
                if (typeof content !== 'string' || !content.trim()) {
                    res.status(400).json({ error: 'Content має бути текстом.' });
                    return;
                }
        
                if (typeof category !== 'string' || !category.trim()) {
                    res.status(400).json({ error: 'Category має бути текстом.' });
                    return;
                }
                
                console.log({
                    userId: res.locals.userId,
                    authorId,
                    authorIdType: typeof authorId,
                    isNaN: Number.isNaN(authorId)
                });

            
                const post = await services.addPostServices({title,content,category,authorId});
        
                res.status(201).json(post);
        
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
