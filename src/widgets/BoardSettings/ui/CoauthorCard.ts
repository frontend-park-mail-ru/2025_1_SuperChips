import { Auth } from 'features/authorization';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import './CoauthorCard.scss';

interface ICoauthorCardProps {
    username: string;
    avatar?: string;
    isCreator: boolean;
    boardId: number;
    userId: string;
    onRemove?: () => void;
}

export const CoauthorCard = (props: ICoauthorCardProps) => {
    const { username, avatar, isCreator, boardId, userId, onRemove } = props;
    
    const card = document.createElement('div');
    card.classList.add('coauthor-card');
    
    // Avatar section
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('coauthor-card__avatar');
    if (avatar) {
        avatarElement.style.backgroundImage = `url(${avatar})`;
    } else {
        avatarElement.classList.add('coauthor-card__avatar--default');
        const initials = document.createElement('span');
        initials.textContent = username.charAt(0).toUpperCase();
        avatarElement.appendChild(initials);
    }
    
    // Username section
    const usernameElement = document.createElement('div');
    usernameElement.classList.add('coauthor-card__username');
    usernameElement.textContent = username;
    
    // Role badge for creator
    if (isCreator) {
        const creatorBadge = document.createElement('div');
        creatorBadge.classList.add('coauthor-card__badge');
        creatorBadge.textContent = 'Создатель';
        card.appendChild(creatorBadge);
    }
    
    // Action button (remove or leave)
    const currentUserId = Auth?.userData?.id;
    const isCurrentUser = currentUserId === userId;
    
    if ((isCreator && !isCurrentUser) || (isCurrentUser && !isCreator)) {
        const actionButton = document.createElement('img');
        actionButton.classList.add('coauthor-card__action');
        
        if (isCreator && !isCurrentUser) {
            // Creator can remove other coauthors
            actionButton.src = '/public/icons/delete.svg';
            actionButton.alt = 'remove coauthor';
            actionButton.addEventListener('click', async () => {
                try {
                    const response = await API.delete(`/boards/${boardId}/coauthors`, { name: userId });
                    if (response instanceof Response && response.ok) {
                        Toast('Соавтор удален', 'success');
                        if (onRemove) onRemove();
                        card.remove();
                    } else {
                        Toast('Ошибка при удалении соавтора', 'error');
                    }
                } catch (error) {
                    Toast('Ошибка при удалении соавтора', 'error');
                }
            });
        } else if (isCurrentUser && !isCreator) {
            // Coauthor can leave the board
            actionButton.src = '/public/icons/exit.svg';
            actionButton.alt = 'leave board';
            actionButton.addEventListener('click', () => {
                showLeaveConfirmation(boardId, onRemove);
            });
        }
        
        card.appendChild(actionButton);
    }
    
    card.appendChild(avatarElement);
    card.appendChild(usernameElement);
    
    return card;
};

const showLeaveConfirmation = (boardId: number, onRemove?: () => void) => {
    const confirmationPopup = document.createElement('div');
    confirmationPopup.classList.add('leave-confirmation');
    
    const message = document.createElement('div');
    message.classList.add('leave-confirmation__message');
    message.textContent = 'Вы уверены, что хотите покинуть доску?';
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('leave-confirmation__buttons');
    
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('leave-confirmation__button', 'leave-confirmation__button--cancel');
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', () => {
        confirmationPopup.remove();
    });
    
    const confirmButton = document.createElement('button');
    confirmButton.classList.add('leave-confirmation__button', 'leave-confirmation__button--confirm');
    confirmButton.textContent = 'Покинуть';
    confirmButton.addEventListener('click', async () => {
        try {
            const response = await API.delete(`/boards/${boardId}/coauthoring`);
            if (response instanceof Response && response.ok) {
                Toast('Вы покинули доску', 'success');
                if (onRemove) onRemove();
                confirmationPopup.remove();
                document.querySelector('.board-settings__close-button')?.dispatchEvent(new Event('click'));
            } else {
                Toast('Ошибка при выходе из доски', 'error');
                confirmationPopup.remove();
            }
        } catch (error) {
            Toast('Ошибка при выходе из доски', 'error');
            confirmationPopup.remove();
        }
    });
    
    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(confirmButton);
    
    confirmationPopup.appendChild(message);
    confirmationPopup.appendChild(buttonsContainer);
    
    document.body.appendChild(confirmationPopup);
};