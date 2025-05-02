import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';

export const updateBoard = async () => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#isPrivate');
    const boardName = document.querySelector('#header');
    if (!input || !privateCheckbox || !boardName) return;

    const board = BoardStorage.getBoardByName(boardName.textContent?.trim());
    if (!board) return;

    const newName = input.value.trim();

    const body = {
        name: newName !== '' ? newName : boardName,
        is_private: privateCheckbox.checked,
    };

    if (newName === board.name && privateCheckbox.checked === board.is_private) {
        Toast('Нет изменений', 'message');
        return;
    }

    const response = await API.put(`/boards/${board.id}`, body);

    if (response instanceof Response && response.ok) {
        BoardStorage.updateBoard(board.id, { is_private: privateCheckbox.checked });
        if (boardName && newName !== '') {
            BoardStorage.updateBoard(board.id, { is_private: privateCheckbox.checked });
            boardName.textContent = newName;
        }
        Toast('Доска успешно обновлена', 'success');
    }
};
