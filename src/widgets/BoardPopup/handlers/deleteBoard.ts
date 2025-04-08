import { toggleInputError } from 'shared/components/input';
import { API } from 'shared/api';

export const deleteBoard = async (boardID: string) => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    const container = input?.closest<HTMLDivElement>('.input-container');
    const boardName = document.querySelector(`#board-${boardID}-name`);

    if (!container || !input || !boardName) return;

    const newName = input.value;
    const oldName = boardName.textContent;

    if (newName !== oldName) {
        toggleInputError(container, { isValid: false, error: 'Введите название доски которую вы хотите удалить' });
        return;
    } else {
        const button = document.querySelector<HTMLButtonElement>('#popup-button');
        if (button) button.disabled = false;
    }

    await API.delete(`/api/v1/boards/${boardID}`);

    // Закрывает попап
    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();

    const boardPreview = document.querySelector<HTMLDivElement>(`#board-${boardID}`);
    boardPreview?.remove();
};
