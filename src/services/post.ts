import type { PostServicesTypes } from './post.types.js';
import type {PostData} from '../transport/dto/responses.js';
import type { PostRepositoryTypes } from '../domain/post/repository.js';

export function PostServices(repository:PostRepositoryTypes): PostServicesTypes{
    return {
        async getAllPostsServices(category:string, take:string){
        return repository.getAllPosts(category, take)
    },
    
        async getPostByIdServices(id:number){
        const post = repository.getPostById(id) 
        return post;
    },
    
        async addPostServices(postData:PostData){
        return repository.addPost(postData)
    }}
    
   
}


