import { joinBoard } from '../handlers/joinBoard';
import { Toast } from 'shared/components/Toast';

export const JoinBoard = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteLink = urlParams.get('invite');
    
    if (!inviteLink) {
        Toast('Неверная ссылка приглашения', 'error');
        return;
    }
    
    joinBoard(inviteLink);
}; 