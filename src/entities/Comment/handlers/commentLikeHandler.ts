import { API } from 'shared/api';

export const commentLikeHandler = async (pinID: string, commentID: string) => {
    const likeButton = document.querySelector<HTMLDivElement>(`#comment-${commentID} .comment__like-button`);
    const likeImg = likeButton?.querySelector<HTMLImageElement>('img');
    const likeCount = likeButton?.querySelector<HTMLSpanElement>('.comment__like-count');
    
    if (!likeButton || !likeImg || !likeCount) return;
    
    const isLiked = likeImg.classList.contains('comment-like_active');
    const count = Number(likeCount.textContent);

    const response = await API.post(`/flows/${pinID}/comments/${commentID}/like`);
    if (!(response instanceof Response && response.ok)) {
        return;
    }

    likeImg.classList.toggle('comment-like', isLiked);
    likeImg.classList.toggle('comment-like_active', !isLiked);
    likeImg.setAttribute('src', `/public/icons/like${!isLiked ? '-filled' : ''}.svg`);
    likeCount.textContent = (count + (isLiked ? -1 : 1)).toString();
}; 