export interface CommentDTO {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface ICommentsByPostId {
    [postId: number]: CommentDTO[];
}
