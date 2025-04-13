import { getBoardNames } from './getBoardNames';

export const addBoardName = (boardName: string, boardID?: string) => {
    const boardNames = getBoardNames();
    if (boardNames) {
        boardNames.push(boardName);
        sessionStorage.setItem('boardNames', JSON.stringify(boardNames));
    } else {
        sessionStorage.setItem('boardNames', JSON.stringify([boardName]));
    }

    if (boardID && boardName) {
        const boardList = sessionStorage.getItem('boardList');
        const newBoard = { id: boardID, name: boardName };
        if (boardList) {
            const data = JSON.parse(boardList);
            data.push(newBoard);
            sessionStorage.setItem('boardList', JSON.stringify(data));
        } else {
            sessionStorage.setItem('boardList', JSON.stringify([newBoard]));
        }
    }
};
