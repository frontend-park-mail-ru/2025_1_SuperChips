import { API } from 'shared/api';

export const editBoard = async (boardID: string) => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#private-checkbox');
    const boardName = document.querySelector(`#board-${boardID}-name`);
    if (!input || !privateCheckbox || !boardName) return;

    const newName = input.value;

    const body = {
        name: newName !== '' ? newName : boardName.textContent,
        is_private: privateCheckbox.checked,
    };

    const response = await API.put(`/api/v1/boards/${boardID}`, body);

    if (response instanceof Response && response.status === 200) {
        const boardName = document.querySelector(`#board-${boardID}-name`);
        if (boardName && newName !== '') {
            boardName.textContent = newName;
        }
    }

    // Закрывает попап
    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();
};
