import express from 'express';

let posts = [
    {id:'1', title:'python', content:'python content', author:'user1', category:'programming'},
    {id:'2', title:'js', content:'js content', author:'user2', category:'programming'}
]

export function getAllPosts(category, take){
    let filteredPosts = posts

    if(category){
        filteredPosts = filteredPosts.filter(post => post.category === category)
    }
    if(take){
       filteredPosts = filteredPosts.slice(0, take)
    }
    return filteredPosts;
}

export function getPostById(id){
    let product = posts

    if(id){
       product = product.find(post => post.id === id)
    }
    return product
}   

export async function addPost(postData){
        const newPost = {id:posts.length + 1, ...postData}
        posts.push(newPost)
        return newPost
}