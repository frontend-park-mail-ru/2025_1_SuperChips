import { Toast } from 'shared/components/Toast';
import { showLeaveConfirmation } from '../handlers/showLeaveConfirmation';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import './CoauthorCard.scss';
import template from './CoauthorCard.hbs';


interface ICoauthorCardProps {
    username: string;
    avatar?: string;
    isCreator: boolean;
    boardId: number;
    userId: string;
    onRemove?: () => void;
}


export const CoauthorCard = (props: ICoauthorCardProps) => {
    if (!Auth.userData) return;

    const { isCreator, boardId, username, onRemove } = props;
    
    const card = document.createElement('div');
    card.classList.add('coauthor-card');

    const currentUsername = Auth?.userData?.username;
    const isCurrentUser = currentUsername === username;

    const config = {
        ...props,
        shortUsername: props.username[0].toUpperCase(),
        canRemove: isCreator && !isCurrentUser,
        canLeave: !isCreator && isCurrentUser,
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
            showLeaveConfirmation(boardId, onRemove);
        });
    }

    return card;
};
