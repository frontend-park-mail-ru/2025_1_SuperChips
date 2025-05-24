import type { ICommentsProps, ICommentData } from '../model/types';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import { Comment } from '../../../entities/Comment/ui/Comment';
import { commentHandler } from '../handlers/commentHandler';
import './Comments.scss';
import template from './Comments.hbs';

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
        const response = await API.post(`/flows/${props.pinID}/comments`, {
            content: commentText
        });
        
        if (response instanceof Error || !response.ok) return;
        
        // Очищаем поле ввода
        commentInput.value = '';
        textareaResizeHandler(commentInput, charCounter);
        
        // Перерисовываем весь блок комментариев
        const commentsContainer = document.querySelector('#comments-container');
        if (commentsContainer) {
            const newComments = await commentHandler(props.pinID);
            if (newComments) {
                commentsContainer.innerHTML = '';
                commentsContainer.appendChild(newComments);
            }
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

    // Инициализируем существующие комментарии
    const commentsList = container.querySelector('.comments-list');
    if (commentsList) {
        commentsList.innerHTML = '';
        props.comments.forEach(comment => {
            const commentInstance = new Comment({
                ...comment,
                created_at: comment.created_at.toString()
            }, props.pinID);
            commentsList.appendChild(commentInstance.getElement());
        });
    }
    
    return container;
};