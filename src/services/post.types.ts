// Тут не уверен с названием файла. 
// На уроке было подобное (products.types.ts), но все же.

import type {PostData, PostResponse} from '../transport/dto/responses.js';

export interface PostServicesTypes{
    getAllPostsServices(category: string | undefined, take: string | undefined): PostResponse[]
    getPostByIdServices(id: number): PostResponse | undefined
    addPostServices(postData: PostData): Promise <PostResponse>
}