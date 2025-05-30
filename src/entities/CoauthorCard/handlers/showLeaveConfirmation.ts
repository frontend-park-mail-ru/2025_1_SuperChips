import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';


export const showLeaveConfirmation = (boardId: number) => {
    const popup = document.createElement('div');
    popup.className = 'leave-confirmation-popup';

    popup.innerHTML = `
    <div class="leave-confirmation__message">Вы уверены, что хотите покинуть доску?</div>
    <div class="leave-confirmation__buttons">
        <div class="leave-confirmation__button--cancel">Отмена</div>
        <div class="leave-confirmation__button--confirm">Покинуть</div>
    </div>        
    `;

    const message = document.createElement('div');
    message.classList.add('leave-confirmation__message');
    message.textContent = 'Вы уверены, что хотите покинуть доску?';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('leave-confirmation__buttons');

    const cancelButton = popup.querySelector('.leave-confirmation__button--cancel');
    cancelButton?.addEventListener('click', () => {
        popup.remove();
    });

    const confirmButton = popup.querySelector('.leave-confirmation__button--confirm');
    confirmButton?.addEventListener('click', async () => {
        const response = await API.delete(`/boards/${boardId}/coauthoring`);
        if (response instanceof Response && response.ok) {
            Toast('Вы покинули доску', 'success');
            popup.remove();
            document.querySelector('.board-settings__close-button')?.dispatchEvent(new Event('click'));
            document.querySelector('.board__settings-button')?.remove();
            BoardStorage.removeBoard(boardId);
        } else {
            Toast('Ошибка при выходе из доски', 'error');
            popup.remove();
        }
    });


    document.body.appendChild(popup);
};
