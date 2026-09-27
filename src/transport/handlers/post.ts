import { getAllPostsServices, getPostByIdServices, addPostServices } from '../../services/post.js';
import {Request, Response} from 'express'
import type { PostRequest } from '../dto/requests.js';
import type { PostResponse } from '../dto/responses.js';


export function getAllPostsHandler(req:Request<PostRequest>, res:Response<PostResponse[]>){
    try{
        const {category, take} = req.query
        if(take > 2){
            let takeError = res.status(404).json('not found')
            return takeError
        }
        const posts = getAllPostsServices(category, take)
        
        res.status(200).json(posts)
        
    }catch(error){
        res.status(500).json('internal server error')
    }
}

export function getPostByIdHandler(req:Request<PostRequest>, res:Response<PostResponse>){
    try{
        const {id} = req.params

        if(!id){
            let idError = res.status(400).json('id має бути цілим числом')
            return idError
        }

        const post = getPostByIdServices(id)

        res.status(200).json(post)
       
    }catch(error){
        res.status(500).json('internal server error')
    }

}

export function addPostHandler(req:Request<PostRequest>,res:Response<PostResponse>){
    try{

        const {title, content, author, category} = req.body

        if (typeof title !== 'string' || title.trim().length < 1){
            let titleError = res.status(400).json('title посту має бути текстом')
            return titleError
        }
        if (typeof content !== 'string' || content.trim().length < 1){
            let contentError = res.status(400).json('content посту має бути текстом')
            return contentError
        }
        if (typeof author !== 'string' || author.trim().length < 1){
            let authorError = res.status(400).json('author посту довжен мати текстовий нікнейм')
            return authorError
        }
        if (typeof category !== 'string' || category.trim().length < 1){
            let categoryError = res.status(400).json('category посту довжен мати текстовий нікнейм')
            return categoryError
        }
        if (!title || !author || !content || !category){
            let error = res.status(422).json('один із параметрів посту є незаповненим')
            return error
        }
        if (404){
            res.status(404).json('пост не знайдено')
        }
        const post = addPostServices({title, content, author, category})

        res.status(201).json(post)

    }catch(error){
        res.status(500).json('internal server error')
    }
}