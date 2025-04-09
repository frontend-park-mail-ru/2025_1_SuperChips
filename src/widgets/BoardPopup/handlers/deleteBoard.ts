import { API } from 'shared/api';

export const deleteBoard = async (boardID: string) => {
    const button = document.querySelector<HTMLButtonElement>('#popup-button');
    if (!button) return;

    if (button.classList.contains('popup__delete-button')) {
        button.classList.add('popup__confirm-button');
        button.classList.remove('popup__delete-button');
        button.textContent = 'Вы уверены что хотите удалить доску?';

    } else if (button.classList.contains('popup__confirm-button')) {
        await API.delete(`/api/v1/boards/${boardID}`);

        // Закрывает попап
        const background = document.querySelector<HTMLDivElement>('.black-background');
        background?.click();

        const boardPreview = document.querySelector<HTMLDivElement>(`#board-${boardID}`);
        boardPreview?.remove();
    }
};
