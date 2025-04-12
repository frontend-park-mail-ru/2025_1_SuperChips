import { Board } from 'entities/Board';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import { addBoardName } from 'features/boardLoader';

export const createBoard = async () => {
    if (!Auth.userData) return;

    const input = document.querySelector<HTMLInputElement>('#board-name');
    const privateCheckbox = document.querySelector<HTMLInputElement>('#isPrivate');
    if (!input || !privateCheckbox) return;

    const reqBody = {
        name: input.value.trim(),
        is_private: privateCheckbox.checked,
    };

    const response = await API.post(`/api/v1/users/${Auth.userData.username}/boards`, reqBody);
    if (response instanceof Error || !response.ok) return;

    const body = await response.json();
    const id = body.data.board_id;

    const newBoard = Board({
        id: id,
        own: true,
        preview: [],
        flow_count: 0,
        name: input.value.trim(),
        is_private: privateCheckbox.checked,
    });

    addBoardName(input.value.trim());

    if (appState.activePage === 'profile') {
        const feed = document.querySelector('#feed');
        const emptyPage = document.querySelector('.empty-page');
        emptyPage?.remove();
        feed?.insertBefore(newBoard, feed.firstChild);
    }

    const background = document.querySelector<HTMLDivElement>('.black-background');
    background?.click();
};
