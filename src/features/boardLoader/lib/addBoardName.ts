import { getBoardNames } from './getBoardNames';

export const addBoardName = (boardName: string) => {
    const boardNames = getBoardNames();
    if (boardNames) {
        boardNames.push(boardName);
        sessionStorage.setItem('boardNames', JSON.stringify(boardNames));
    } else {
        sessionStorage.setItem('boardNames', JSON.stringify([boardName]));
    }
};
