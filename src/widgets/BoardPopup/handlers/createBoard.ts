import { Board } from 'entities/Board';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';

export const createBoard = async () => {
    if (!Auth.userData) return;

    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#private-checkbox');
    if (!input || !privateCheckbox) return;

    const reqBody = {
        name: input.value,
        is_private: privateCheckbox.checked,
    };

    const response = await API.post(`/api/v1/user/${Auth.userData.username}/boards`, reqBody);

    if (response instanceof Error || response.status === 409) return;

    const body = await response.json();

    const id = body.data.board_id;

    const newBoard = Board({
        id: id,
        own: true,
        preview: [],
        flow_count: 0,
        name: input.value,
        is_private: privateCheckbox.checked,
    });

    const feed = document.querySelector('#feed');
    const emptyPage = document.querySelector('.empty-page');
    emptyPage?.remove();
    feed?.appendChild(newBoard);

    // Закрывает попап
    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();
};
