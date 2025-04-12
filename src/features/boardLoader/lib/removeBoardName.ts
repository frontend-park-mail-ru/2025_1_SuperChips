import { getBoardNames } from './getBoardNames';
import type { IBoardProps } from 'entities/Board';

export const removeBoardName = (boardName: string) => {
    const boardNames = getBoardNames();
    const boardListData = sessionStorage.getItem('boardList');

    if (boardNames) {
        const filteredBoardNames = boardNames.filter(item => item !== boardName);
        sessionStorage.setItem('boardNames', JSON.stringify(filteredBoardNames));
    }

    if (boardListData) {
        const boardList = JSON.parse(boardListData);
        const filteredBoardList = boardList.filter((item: IBoardProps) => item.name !== boardName);
        sessionStorage.setItem('boardList', JSON.stringify(filteredBoardList));
    }
};
