import type { IBoardProps } from 'entities/Board';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';

export const savePinToBoard = async (pinID: string, boardName?: string) => {
    const closeButton = document.querySelector<HTMLImageElement>('.popup__close');

    if (!boardName) {
        const id = findBoardIDbyName(USER_SAVED_PINS_BOARD);
        if (!id) return;

        const response = await API.post(`/api/v1/boards/${id}/flows`, { flow_id: Number(pinID) });

        if (response instanceof Response && response.ok) {
            Toast('flow добавлен в вашу коллекцию', 'message');
            closeButton?.click();
        } else {
            Toast('Произошла ошибка или flow уже добавлен на доску', 'error');
            closeButton?.click();
        }
        return;
    } else {
        const id = findBoardIDbyName(boardName);
        if (!id) return;

        const response = await API.post(`/api/v1/boards/${id}/flows`, { flow_id: Number(pinID) });

        if (response instanceof Response && response.ok) {
            Toast(`flow добавлен на доску ${boardName}`, 'message');
            closeButton?.click();
        } else {
            Toast('Произошла ошибка или flow уже добавлен на доску', 'error');
            closeButton?.click();
        }
    }
};

export const findBoardIDbyName = (boardName: string) => {
    const data = sessionStorage.getItem('boardList');
    if (!data) return null;
    const boardList = JSON.parse(data);

    const board = boardList.find((item: IBoardProps) => item.name === boardName);
    if (!board) return null;
    return board.id;
};
