import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';

export const deleteBoard = async (boardID: number) => {
    const button = document.querySelector<HTMLButtonElement>('#popup-button');
    if (!button) return;

    if (button.classList.contains('popup__delete-button')) {
        button.classList.add('popup__confirm-button');
        button.classList.remove('popup__delete-button');
    } else if (button.classList.contains('popup__confirm-button')) {
        const response = await API.delete(`/api/v1/boards/${boardID}`);

        if (response instanceof Response && response.ok) {
            const name = document.querySelector<HTMLDivElement>(`#board-${boardID}-name`);
            if (name) {
                if (BoardStorage.boardToSave === name.textContent) {
                    BoardStorage.boardToSave = USER_SAVED_PINS_BOARD;
                }
                BoardStorage.removeBoard(boardID);

            }

            const boardPreview = document.querySelector<HTMLDivElement>(`#board-${boardID}`);
            boardPreview?.remove();
        } else {
            Toast('Ошибка при удалении доски');
        }
        // Закрывает попап
        const background = document.querySelector<HTMLDivElement>('.black-background');
        background?.click();
    }
};
