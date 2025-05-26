export interface ICommentData {
    id: string;
    author_username: string;
    author_name: string;
    author_avatar?: string;
    text: string;
    like_count: number;
    is_liked: boolean;
    created_at: string | Date;
    can_delete: boolean;
    timestamp: string;
    content: string;
}

export interface ICommentsProps {
    pinID: string;
    comments: ICommentData[];
    authorized: boolean;
}
