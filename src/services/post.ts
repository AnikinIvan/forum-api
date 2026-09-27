import { getAllPosts, getPostById, addPost } from '../repositories/post.js';
import {PostData} from '../transport/dto/responses.js';

export function getAllPostsServices(category:string, take:string){
    return getAllPosts(category, take)
}

export function getPostByIdServices(id:number){
    const post = getPostById(id) 
    if (!post){
        return 404 
    }
    return post
}

export function addPostServices(postData:PostData){
    return addPost(postData)
}

