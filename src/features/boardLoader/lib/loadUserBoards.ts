import { Auth } from 'features/authorization';
import { API } from 'shared/api/api';
import { IBoardList } from '../model/types';


export const loadUserBoards = async (username: string) => {
    if (!Auth.userData) return { status: 404, };

    const response = await API.get('api/v1/profile/boards');
    if (response instanceof Error) return;

    const body = await response.json();

    const boardList: IBoardList = {
        status: response.status,
        data: body.data,
    };

    localStorage.setItem('boardList', JSON.stringify(boardList));

    return boardList;
};
