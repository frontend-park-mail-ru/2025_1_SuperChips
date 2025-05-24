import type { ICommentData } from '../model/types';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import template from './CommentItem.hbs';

export const CommentItem = (comment: ICommentData, pinID: string, container: HTMLElement) => {
    const commentElement = document.createElement('div');
    commentElement.innerHTML = template(comment);
    
    const actualCommentElement = commentElement.firstElementChild as HTMLElement;
    if (!actualCommentElement) return commentElement;
    
    addEventListeners(actualCommentElement, comment, pinID, container);
    
    return commentElement;
};

function addEventListeners(commentElement: HTMLElement, comment: ICommentData, pinID: string, container: HTMLElement) {
    const likeButton = commentElement.querySelector('.comment__like-button');
    likeButton?.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (!Auth.userData) {
            console.log('User not authorized');
            return;
        }
        
        const likeImg = commentElement.querySelector('.comment-like, .comment-like_active');
        const likeCount = commentElement.querySelector<HTMLSpanElement>('.comment__like-count');
        
        if (!likeImg || !likeCount) {
            console.log('Like elements not found');
            return;
        }
        
        try {
            const response = await API.post(`/flows/${pinID}/comments/${comment.id}/like`);
            
            if (response instanceof Error || !response.ok) {
                console.error('Error liking comment:', response);
                return;
            }
            
            const data = await response.json();
            const isLiked = data.action === 'insert';
            
            if (isLiked) {
                likeImg.classList.remove('comment-like');
                likeImg.classList.add('comment-like_active');
                likeImg.setAttribute('src', '/public/icons/like-filled.svg');
                likeCount.textContent = String(parseInt(likeCount.textContent || '0') + 1);
            } else {
                likeImg.classList.remove('comment-like_active');
                likeImg.classList.add('comment-like');
                likeImg.setAttribute('src', '/public/icons/like.svg');
                likeCount.textContent = String(parseInt(likeCount.textContent || '0') - 1);
            }
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    });
    
    const deleteButton = commentElement.querySelector('.comment__action-delete');
    deleteButton?.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (!Auth.userData) {
            console.log('User not authorized');
            return;
        }
        
        if (!confirm('Вы уверены, что хотите удалить комментарий?')) {
            return;
        }
        
        try {
            const response = await API.delete(`/flows/${pinID}/comments/${comment.id}`);
            
            if (response instanceof Error || !response.ok) {
                console.error('Error deleting comment:', response);
                return;
            }
            
            commentElement.remove();
            
            const commentsList = container.querySelector('.comments-list');
            if (commentsList && commentsList.children.length === 0) {
                commentsList.innerHTML = '<div class="comments-empty">Нет комментариев</div>';
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    });
    
    const actionsIcon = commentElement.querySelector('.comment__actions-icon');
    const actionsMenu = commentElement.querySelector('.comment__actions-menu');
    
    if (actionsIcon && actionsMenu) {
        actionsIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            actionsMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!actionsMenu.contains(e.target as Node)) {
                actionsMenu.classList.remove('active');
            }
        });
    }
}