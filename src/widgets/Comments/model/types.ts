export interface ICommentData {
    id: string;
    author_username: string;
    author_avatar?: string;
    author_name: string;
    text: string;
    like_count: number;
    is_liked?: boolean;
    created_at: string;
    can_delete?: boolean;
}

export interface ICommentsProps {
    pinID: string;
    comments: ICommentData[];
    authorized: boolean;
}