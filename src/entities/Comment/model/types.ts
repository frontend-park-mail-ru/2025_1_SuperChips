export interface ICommentData {
    id: string;
    author_username: string;
    author_name: string;
    author_avatar?: string;
    text: string;
    like_count: number;
    is_liked: boolean;
    created_at: string;
    can_delete: boolean;
} 
