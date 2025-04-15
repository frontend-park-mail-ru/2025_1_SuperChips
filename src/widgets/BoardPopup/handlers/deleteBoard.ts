import { API } from 'shared/api';
import { removeBoardName } from 'features/boardLoader';

export const deleteBoard = async (boardID: string) => {
    const button = document.querySelector<HTMLButtonElement>('#popup-button');
    if (!button) return;

    if (button.classList.contains('popup__delete-button')) {
        button.classList.add('popup__confirm-button');
        button.classList.remove('popup__delete-button');
    } else if (button.classList.contains('popup__confirm-button')) {
        await API.delete(`/api/v1/boards/${boardID}`);

        // Закрывает попап
        const background = document.querySelector<HTMLDivElement>('.black-background');
        background?.click();

        const name = document.querySelector<HTMLDivElement>(`#board-${boardID}-name`);
        if (name) {
            removeBoardName(name.textContent || '');
        }

        const boardPreview = document.querySelector<HTMLDivElement>(`#board-${boardID}`);
        boardPreview?.remove();
    }
};
