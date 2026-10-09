import type {PostData, PostResponse} from '../transport/dto/responses.js';
import type { PostRepositoryTypes } from '../domain/post/repository.js';
import { db } from '../prisma/db.js';

export function PostRepositories():PostRepositoryTypes{
    async function getAllPosts(category:string | undefined, take:string | undefined){
       let post = db.orm.public.Post

       if(take){
            post = post.limit(Number(take))
        }

       if(category){
            post = post.where({ category });
       }
       
       return post;
    }
    
    async function getPostById(id:number){
        return db.orm.public.Post.where({ id }).first()
    }   
    
    async function addPost(postData:PostData){
        return db.orm.public.Post.create({ ...postData })
    }
    return {getAllPosts, getPostById, addPost} 
}
// ошибка на строке 27, подчеркивает getallposts