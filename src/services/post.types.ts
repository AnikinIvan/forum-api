
import type {PostData, PostResponse} from '../transport/dto/responses.js';

export interface PostServicesTypes{
    getAllPostsServices(category: string | undefined, take: string | undefined): Promise<PostResponse[]>
    getPostByIdServices(id: number): Promise<PostResponse | undefined | null>
    addPostServices(postData: PostData): Promise<PostResponse>
}