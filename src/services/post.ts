import type { PostServicesTypes } from './post.types.js';
import type {PostData} from '../transport/dto/responses.js';
import type { PostRepositoryTypes } from '../domain/post/repository.js';

export function PostServices(repository:PostRepositoryTypes): PostServicesTypes{
    function getAllPostsServices(category:string, take:string){
        return repository.getAllPosts(category, take)
    }
    
    function getPostByIdServices(id:number){
        const post = repository.getPostById(id) 
        if (!post){
            return undefined 
        }
        return post
    }
    
    function addPostServices(postData:PostData){
        return repository.addPost(postData)
    }
    return {getAllPostsServices, getPostByIdServices, addPostServices}
}


