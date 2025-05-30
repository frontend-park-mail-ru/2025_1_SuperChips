import { Toast } from 'shared/components/Toast';
import { showLeaveConfirmation } from '../handlers/showLeaveConfirmation';
import { navigate } from 'shared/router';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import './CoauthorCard.scss';
import template from './CoauthorCard.hbs';


interface ICoauthorCardProps {
    username: string;
    avatar?: string;
    creator: string;
    boardId: number;
    onRemove?: () => void;
}


export const CoauthorCard = (props: ICoauthorCardProps) => {
    if (!Auth.userData) return;

    const { creator, boardId, username, onRemove } = props;
    
    const card = document.createElement('div');
    card.classList.add('coauthor-card');

    const currentUsername = Auth.userData.username;
    const isCurrentUser = currentUsername === username;
    const isCreator = creator === currentUsername;

    const config = {
        ...props,
        shortUsername: props.username[0].toUpperCase(),
        canRemove: isCreator && !isCurrentUser,
        canLeave: !isCreator && isCurrentUser,
        isCreator: props.creator === props.username,
    };

    card.innerHTML = template(config);

    const actionButton = card.querySelector('.coauthor-card__action');
    if (config.canRemove && actionButton) {
        actionButton.addEventListener('click', async () => {
            const response = await API.delete(`/boards/${boardId}/coauthors`, { name: username });
            if (response instanceof Response && response.ok) {
                Toast('Соавтор удален', 'success');
                if (onRemove) onRemove();
                card.remove();
            } else {
                Toast('Ошибка при удалении соавтора', 'error');
            }
        });
    } else if (config.canLeave && actionButton) {
        actionButton.addEventListener('click', () => {
            showLeaveConfirmation(boardId);
        });
    }

    card.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('coauthor-card__action')) return;
        navigate(`${props.username}`).finally();
    });

    return card;
};
