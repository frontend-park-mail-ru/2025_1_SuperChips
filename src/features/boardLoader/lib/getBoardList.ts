import type { IBoardList } from '../model/types';

export const getBoardList = (): IBoardList | null => {
    const data = localStorage.getItem('boardList');
    return data ? JSON.parse(data) : null;
};
