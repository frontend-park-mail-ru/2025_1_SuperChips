import type { ICommentData, ICommentsProps } from '../model/types';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import './Comments.scss';
import template from './Comments.hbs';
import { CommentItem } from './CommentItem';

const placeholderTexts = [
    "Поймай волну мыслей...",
    "Штиль в комментариях? Создай свою волну!",
    "Оставь след на песке обсуждений...",
    "Поделись своим взглядом на горизонт...",
    "Брось камешек в океан комментариев...",
    "Твоё мнение — как глоток свежего бриза...",
    "Серфинг по мыслям: поделись своими...",
    "Прокатись на волне обсуждения...",
    "Твой комментарий может стать приливом идей...",
    "Оставь свой след на доске обсуждений..."
];

const textareaResizeHandler = (textarea: HTMLTextAreaElement, charCounter: HTMLElement | null) => {
    const maxHeight = 120;
    const showCounterThreshold = 450;
    const maxLength = 500;

    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

    if (!charCounter) return;
    const currentLength = textarea.value.length;
    if (currentLength >= showCounterThreshold) {
        charCounter.textContent = `${currentLength}/${maxLength}`;
        charCounter.style.display = 'block';
    } else {
        charCounter.style.display = 'none';
    }
};

export const Comments = async (props: ICommentsProps) => {
    const container = document.createElement('div');
    container.setAttribute('data-pin-id', props.pinID);
    
    const config = {
        ...props,
        user_avatar: Auth.userData?.avatar,
        shortUsername: Auth.userData?.username?.[0].toUpperCase(),
        authorized: !!Auth.userData
    };
    
    container.innerHTML = template(config);
    
    const commentInput = container.querySelector<HTMLTextAreaElement>('#comment-input');
    if (commentInput) {
        const randomIndex = Math.floor(Math.random() * placeholderTexts.length);
        commentInput.placeholder = placeholderTexts[randomIndex];
    }
    
    const charCounter = container.querySelector<HTMLElement>('#comment-char-counter');
    
    commentInput?.addEventListener('input', () => {
        textareaResizeHandler(commentInput, charCounter);
    });
    
    const submitComment = async () => {
        if (!commentInput || !commentInput.value.trim() || !Auth.userData) return;
        
        const commentText = commentInput.value.trim();
        try {
            console.log(`Sending new comment for pin ${props.pinID}`);
            const response = await API.post(`/flows/${props.pinID}/comments`, {
                content: commentText
            });
            
            if (response instanceof Error || !response.ok) {
                console.error('Error submitting comment:', response);
                return;
            }
            
            const commentData = await response.json();
            
            addCommentToDOM(container, {
                id: commentData.id,
                author_username: Auth.userData.username,
                author_name: Auth.userData.public_name || Auth.userData.username,
                author_avatar: Auth.userData.avatar,
                text: commentText,
                like_count: 0,
                is_liked: false,
                created_at: new Date().toISOString(),
                can_delete: true
            });
            
            commentInput.value = '';
            textareaResizeHandler(commentInput, charCounter);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    
    commentInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitComment();
        }
    });
    
    const submitButton = container.querySelector('#submit-comment');
    submitButton?.addEventListener('click', submitComment);
    
    return container;
};

function addCommentToDOM(container: HTMLElement, comment: ICommentData) {
    const commentsList = container.querySelector('.comments-list');
    if (!commentsList) return;
    
    const emptyMessage = commentsList.querySelector('.comments-empty');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const pinID = container.getAttribute('data-pin-id') || '';
    const commentElement = CommentItem(comment, pinID, container);
    commentsList.prepend(commentElement);
}