import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';


export const showLeaveConfirmation = (boardId: number, onRemove?: () => void) => {
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
    });

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(confirmButton);

    confirmationPopup.appendChild(message);
    confirmationPopup.appendChild(buttonsContainer);

    document.body.appendChild(confirmationPopup);
};
