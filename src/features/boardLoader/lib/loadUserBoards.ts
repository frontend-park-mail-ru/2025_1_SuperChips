import type { IBoardList } from '../model/types';
import type { IBoardProps } from 'entities/Board';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';


// Загружает список досок пользователя и добавляет их названия в localStorage
export const loadUserBoards = async (username: string) => {
    const own = Auth.userData ? Auth.userData.username === username : false;

    const URL = own ? '/api/v1/profile/boards' : `/api/v1/user/${username}/boards`;

    const response = await API.get(URL);
    if (response instanceof Error) return;

    const body = await response.json();

    if (body.data) {
        body.data.forEach((item: IBoardProps) => {
            item.own = own;
        });
    }

    const result: IBoardList = {
        status: response.status,
        data: body.data,
    };

    if (own && result.data) {
        const boardNames = result.data.map(board => board.name);
        localStorage.setItem('boardNames', JSON.stringify(boardNames));
    }

    return result;
};
