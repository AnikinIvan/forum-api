export interface PostRequest{ 
    title: string;
    content: string;
    author: string;
    category: string;
}

export interface AuthCredentialsRequest {
    email: string;
    password: string;
}

