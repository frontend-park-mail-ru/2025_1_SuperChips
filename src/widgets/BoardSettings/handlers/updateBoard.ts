import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';

export const updateBoard = async () => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#isPrivate');
    const header = document.querySelector<HTMLSpanElement>('#board-header-text');
    if (!input || !privateCheckbox || !header) return;

    const boardName = header.textContent?.trim();
    const board = BoardStorage.getBoardByName(boardName);

    if (!board || !boardName) return;

    const newName = input.value.trim();

    const body = {
        name: newName !== '' ? newName : header,
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
            BoardStorage.updateBoard(board.id, { name: newName });
            header.innerHTML = newName;
        }
        Toast('Доска успешно обновлена', 'success');
    }
};
