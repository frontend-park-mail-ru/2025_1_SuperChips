import { getBoardNames } from './getBoardNames';

export const removeBoardName = (boardName: string) => {
    const boardNames = getBoardNames();
    if (boardNames) {
        boardNames.filter(item => item !== boardName);
        sessionStorage.setItem('boardNames', JSON.stringify(boardNames));
    }
};
