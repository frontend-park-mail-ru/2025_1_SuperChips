import { API } from 'shared/api';
import { Comments } from '../ui/Comments';
import type { ICommentData } from '../../../entities/Comment/model/types';
import { formatDateToReadable } from 'shared/utils';
import { Auth } from 'features/authorization';

export const commentHandler = async (pinID: string, page = 1, size = 10) => {
    if (!pinID) return null;
    
    const response = await API.get(`/flows/${pinID}/comments?page=${page}&size=${size}`);
    if (response instanceof Error || !response.ok) {
        console.error('Error fetching comments');
        return Comments({
            pinID,
            comments: [],
            authorized: !!Auth.userData
        });
    }

    const data = await response.json();
    if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Invalid comments data format:', data);
        return Comments({
            pinID,
            comments: [],
            authorized: !!Auth.userData
        });
    }

    const comments = data.data.map((comment: any) => {
        const formattedDate = formatDateToReadable(comment.timestamp);
        return {
            id: comment.id,
            author_username: comment.author_username,
            author_name: comment.author_username,
            author_avatar: comment.author_avatar,
            text: comment.content,
            like_count: comment.like_count || 0,
            is_liked: comment.is_liked || false,
            created_at: formattedDate,
            can_delete: comment.author_username === Auth.userData?.username
        };
    });
    
    return Comments({
        pinID,
        comments,
        authorized: !!Auth.userData
    });
};