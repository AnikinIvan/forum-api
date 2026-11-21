export interface Post{
    id:number;
    title:string;
    content:string;
    author: {
        id: number
        email: string
    }
    category:string;
    authorId:number;
}