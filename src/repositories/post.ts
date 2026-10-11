import type {PostData, PostResponse} from '../transport/dto/responses.js';
import type { PostRepositoryTypes } from '../domain/post/repository.js';
import { db } from '../prisma/db.js';

export function PostRepositories():PostRepositoryTypes{
    return {
        async getAllPosts(category: string | undefined, take: string | undefined) {
            const result = await db.orm.public.Post.all()
            console.log('Posts count:', result.length)
            return result
        },
         
        async getPostById(id:number){
            return db.orm.public.Post.where({ id }).first()
         },
         
        async addPost(postData: PostData) {
            const id = Math.floor(Math.random() * 10000) // тут неправильно, не знаю почему так - до этого не работало.
            const result = await db.orm.public.Post.create({id, title: postData.title, content: postData.content, author: postData.author, category: postData.category})
            return result
        }
}}