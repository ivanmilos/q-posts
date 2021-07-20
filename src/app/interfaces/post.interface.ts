import { CommentDTO } from './comment.interface';
import { UserDTO } from './user.interface';

export interface PostDTO {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPost {
    user: UserDTO;
    comments: CommentDTO[];
    post: PostDTO;
}
