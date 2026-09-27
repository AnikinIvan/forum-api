import express from 'express';
import {PostData, PostResponse} from '../transport/dto/responses.js';


let posts = [
    {id:1, title:'python', content:'python content', author:'user1', category:'programming'},
    {id:2, title:'js', content:'js content', author:'user2', category:'programming'}
]

export function getAllPosts(category:string, take:string){
    let filteredPosts = posts

    if(category){
        filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    if(take){
       filteredPosts = filteredPosts.slice(0, Number(take))
    }
    return filteredPosts;
}

export function getPostById(id:number){
    let filteredPost : PostResponse | undefined;
    if(id){
        filteredPost = posts.find(post => post.id === id)
    }
    return filteredPost
}   

export async function addPost(postData:PostData){
        const newPost = {id:posts.length + 1, ...postData}
        posts.push(newPost)
        return newPost
}