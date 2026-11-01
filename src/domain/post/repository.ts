import type {PostData, PostResponse} from '../../transport/dto/responses.js';

export interface PostRepositoryTypes{
    getAllPosts(category: string | undefined, take: string | undefined): Promise<PostResponse[]>
    getPostById(id: number): Promise<PostResponse | null>
    addPost(postData: PostData): Promise<PostResponse>
}