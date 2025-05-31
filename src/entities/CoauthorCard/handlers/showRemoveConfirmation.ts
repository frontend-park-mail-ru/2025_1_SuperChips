import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';

export const showRemoveConfirmation = (boardID: number, card: HTMLElement, username: string) => {
    const popup = document.createElement('div');
    popup.className = 'leave-confirmation-popup';

    popup.innerHTML = `
    <div class="leave-confirmation__message">Вы уверены, что хотите удалить соавтора?</div>
    <div class="leave-confirmation__buttons">
        <div class="leave-confirmation__button--cancel">Отмена</div>
        <div class="leave-confirmation__button--confirm">Удалить</div>
    </div>        
    `;

    const cancelButton = popup.querySelector('.leave-confirmation__button--cancel');
    cancelButton?.addEventListener('click', () => {
        popup.remove();
    });

    const confirmButton = popup.querySelector('.leave-confirmation__button--confirm');
    confirmButton?.addEventListener('click', async () => {
        const response = await API.delete(`/boards/${boardID}/coauthors`, { name: username });
        if (response instanceof Response && response.ok) {
            Toast('Соавтор удален', 'success');
            card.remove();
        } else {
            Toast('Ошибка при удалении соавтора', 'error');
        }
        popup.remove();
    });

    document.body.appendChild(popup);
};

