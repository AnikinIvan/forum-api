import type {PostData, PostResponse} from '../transport/dto/responses.js';
import type { PostRepositoryTypes } from '../domain/post/repository.js';
import { db } from '../prisma/db.js';

export function PostRepositories():PostRepositoryTypes{
    return {
        async getAllPosts(category: string | undefined, take: string | undefined) {
            let result = db.orm.public.Post
            if(category) result = result.where({category})
            if(take) result = result.limit(Number(take))
            return await result.all()
        },
         
        async getPostById(id:number){
            return db.orm.public.Post.where({ id }).first()
         },
         
        async addPost(postData: PostData) {
            const result = await db.orm.public.Post.create({title: postData.title, content: postData.content, author: postData.author, category: postData.category})
            return result
        }
}}