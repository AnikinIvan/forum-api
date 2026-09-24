import { getAllPosts, getPostById, addPost } from '../repositories/post.js';

export function getAllPostsServices(category, take){
    return getAllPosts(category, take)
}

export function getPostByIdServices(id){
    const post = getPostById(id) 
    if (!post){
        throw new Error('not found')
    }
    return post
}

export function addPostServices(postData){
    return addPost(postData)
}

