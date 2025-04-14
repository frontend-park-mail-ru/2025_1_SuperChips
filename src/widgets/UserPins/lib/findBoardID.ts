import type { IBoardProps } from 'entities/Board';
import { USER_OWN_PINS_BOARD } from 'shared/config/constants';
import { boardFeedState } from 'pages/BoardPage';
import { API } from 'shared/api';

export const findBoardID = async (username: string) => {
    const boardListRequest = await API.get(`/api/v1/users/${username}/boards`);
    if (boardListRequest instanceof Error || !boardListRequest.ok) return { status: 404 };

    const boardListBody = await boardListRequest.json();
    if (!boardListBody.data) return;

    const boardList = (boardListBody.data);
    const board = boardList.find((item: IBoardProps) => item.name === USER_OWN_PINS_BOARD);
    if (board) {
        boardFeedState.boardID = board.id;
    }
};
