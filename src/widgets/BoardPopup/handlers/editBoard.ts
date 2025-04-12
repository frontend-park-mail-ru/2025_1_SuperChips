import { API } from 'shared/api';
import { addBoardName, removeBoardName } from 'features/boardLoader';

export const editBoard = async (boardID: string) => {
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

    if (response instanceof Response && response.status === 200) {
        if (boardName && newName !== '') {
            removeBoardName(boardName.textContent ? boardName.textContent : '');
            addBoardName(newName);
            boardName.textContent = newName;
        }

        const lock = document.querySelector<HTMLImageElement>(`#private-icon-${boardID}`);
        if (lock) {
            lock.remove();
        } else {
            const preview = document.querySelector<HTMLDivElement>(`#board-${boardID}-preview`);
            const icon = document.createElement('img');
            icon.src = '/public/icons/lock.svg';
            icon.id = `private-icon-${boardID}`;
            icon.classList.add('private-icon', 'hidden');

            preview?.appendChild(icon);
        }
    }

    // Закрывает попап
    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();
};
