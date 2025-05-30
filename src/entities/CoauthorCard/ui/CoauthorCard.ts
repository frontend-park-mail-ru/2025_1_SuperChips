import { showLeaveConfirmation } from '../handlers/showLeaveConfirmation';
import { showRemoveConfirmation } from '../handlers/showRemoveConfirmation';
import { navigate } from 'shared/router';
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

    const { creator, boardId, username } = props;
    
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
            showRemoveConfirmation(boardId, card, username);
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
