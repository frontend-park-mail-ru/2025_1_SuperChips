import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { Toast } from 'shared/components/Toast';


export const confirmBoardDelete = async (boardID: number) => {
    const button = document.querySelector<HTMLElement>('.board-settings__delete-button')
        || document.querySelector<HTMLElement>('.board-settings__confirm-button');

    if (!button) throw new Error('button not found');

    if (button.classList.contains('board-settings__delete-button')) {
        button.classList.replace('board-settings__delete-button', 'board-settings__confirm-button');
        const text = button.querySelector('#board-settings__delete-button__text');
        if (text) {
            text.textContent = 'Нажмите еще раз чтобы удалить доску';
        }
        setTimeout(() => {
            document.addEventListener('click', rollbackBoardDelete, { once: true });
        }, 0);
        throw new Error('not confirmed');
    } else if (button.classList.contains('board-settings__confirm-button')) {
        const response = await API.delete(`/api/v1/boards/${boardID}`);

        if (response instanceof Response && response.ok) {
            const board = BoardStorage.getBoardByID(boardID);
            if (board) {
                if (BoardStorage.boardToSave === board.name) {
                    BoardStorage.boardToSave = USER_SAVED_PINS_BOARD;
                }
                BoardStorage.removeBoard(boardID);
            }


            const boardPreview = document.querySelector<HTMLDivElement>(`#board-${boardID}`);
            boardPreview?.remove();
        } else {
            Toast('Ошибка при удалении доски');
        }
        document.querySelector<HTMLDivElement>('.board-settings__close-button')?.click();
        return 'confirmed';
    }
};


const rollbackBoardDelete = (event: Event) => {
    const clickedElement = event.target as HTMLElement;
    const button = document.querySelector<HTMLElement>('.board-settings__confirm-button');
    if (button && clickedElement !== button) {
        button.classList.replace('board-settings__confirm-button', 'board-settings__delete-button');
        const text = button.querySelector('#board-settings__delete-button__text');
        if (text) {
            text.textContent = 'Удалить доску';
        }
    }
};
