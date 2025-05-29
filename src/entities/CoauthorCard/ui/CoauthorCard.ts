import { Toast } from 'shared/components/Toast';
import { showLeaveConfirmation } from '../handlers/showLeaveConfirmation';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
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

    // const config = {
    //     ...props,
    //     shortUsername: props.username[0].toUpperCase(),
    // };
    //
    // console.log(config);
    // card.innerHTML = template(config);
    
    // Avatar section
    const avatarElement = document.createElement('div');
    avatarElement.classList.add('coauthor-card__avatar');
    if (avatar) {
        avatarElement.style.backgroundImage = `url(${avatar})`;
    } else {
        avatarElement.classList.add('coauthor-card__avatar');
        // avatarElement.classList.add('coauthor-card__avatar--default');
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
                const response = await API.delete(`/boards/${boardId}/coauthors`, { name: userId });
                if (response instanceof Response && response.ok) {
                    Toast('Соавтор удален', 'success');
                    if (onRemove) onRemove();
                    card.remove();
                } else {
                    Toast('Ошибка при удалении соавтора', 'error');
                }
            });
        } else if (isCurrentUser && !isCreator) {
            // Coauthor can leave the board
            actionButton.src = '/public/icons/exit.svg';
            actionButton.alt = 'leave board';
            actionButton.addEventListener('click', () => {
                // eslint-disable-next-line no-undef
                showLeaveConfirmation(boardId, onRemove);
            });
        }

        card.appendChild(actionButton);
    }

    card.appendChild(avatarElement);
    card.appendChild(usernameElement);
    
    return card;
};



