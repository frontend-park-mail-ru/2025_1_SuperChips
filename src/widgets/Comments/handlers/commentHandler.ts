import { API } from 'shared/api';
import { Comments } from '../ui/Comments';
import type { ICommentData } from '../model/types';
import { formatDateToReadable } from 'shared/utils';
import { Auth } from 'features/authorization';

export const commentHandler = async (pinID: string, page = 1, size = 10) => {
    if (!pinID) return null;
    
    try {
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
        console.log('Raw comments data:', data.data);

        const comments = data.data.map((comment: any) => {
            console.log('Processing comment:', comment);
            
            let formattedDate = 'недавно';
            try {
                if (comment.created_at) {
                    const date = new Date(comment.created_at);
                    if (!isNaN(date.getTime())) {
                        formattedDate = formatDateToReadable(date);
                    } else {
                        console.error('Invalid date format:', comment.created_at);
                    }
                }
            } catch (error) {
                console.error('Error formatting date:', error);
            }
            
            return {
                id: comment.id,
                author_username: comment.author_username,
                author_name: comment.author_name || comment.author_username,
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
    } catch (error) {
        console.error('Error fetching comments:', error);
        return Comments({
            pinID,
            comments: [],
            authorized: !!Auth.userData
        });
    }
};