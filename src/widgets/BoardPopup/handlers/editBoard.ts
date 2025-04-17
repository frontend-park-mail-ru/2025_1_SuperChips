import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';

export const editBoard = async (boardID: number) => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#isPrivate');
    const boardName = document.querySelector(`#board-${boardID}-name`);
    if (!input || !privateCheckbox || !boardName) return;

    const newName = input.value.trim();

    const body = {
        name: newName !== '' ? newName : boardName.textContent,
        is_private: privateCheckbox.checked,
    };

    const response = await API.put(`/api/v1/boards/${boardID}`, body);

    if (response instanceof Response && response.ok) {
        BoardStorage.updateBoard(boardID, { is_private: privateCheckbox.checked });
        if (boardName && newName !== '') {
            BoardStorage.updateBoard(boardID, { is_private: privateCheckbox.checked });
            boardName.textContent = newName;
        }

        const lock = document.querySelector<HTMLImageElement>(`#private-icon-${boardID}`);

        if (lock && !privateCheckbox.checked) {
            lock.remove();
        } else if (privateCheckbox.checked) {
            const preview = document.querySelector<HTMLDivElement>(`#board-${boardID}-preview`);
            const icon = document.createElement('img');
            icon.src = '/public/icons/lock.svg';
            icon.id = `private-icon-${boardID}`;
            icon.classList.add('preview__icon-private', 'hidden');
            preview?.appendChild(icon);
        }
    }

    // Закрывает попап
    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();
};
