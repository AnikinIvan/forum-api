import type {PostData, PostResponse} from '../../transport/dto/responses.js';

export interface PostRepositoryTypes{
    getAllPosts(category: string | undefined, take: string | undefined): PostResponse[]
    getPostById(id: number): PostResponse | undefined
    addPost(postData: PostData): Promise<PostResponse>
}