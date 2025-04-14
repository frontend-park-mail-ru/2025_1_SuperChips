import type { ILoadedPictures } from '../model/types';
import { API } from 'shared/api';
import { boardFeedState } from 'pages/BoardPage';


export const loadUserPictures = async (page: number, boardID: string): Promise<ILoadedPictures | null> => {
    if (boardFeedState.isLoading || !boardFeedState.boardID) return { status: 404 };
    boardFeedState.isLoading = true;

    const boardImagesRequest = await API.get(`/api/v1/boards/${boardID}/flows?page=${page}&size=20`);
    if (boardImagesRequest instanceof Error || !boardImagesRequest.ok) {
        boardFeedState.isLoading = false;
        return { status: 404 };
    }

    const body = await boardImagesRequest.json();
    boardFeedState.isLoading = false;

    if (!body.data) {
        return { status: 404 };
    }

    boardFeedState.isLoading = false;
    return { status: boardImagesRequest.status, data: body.data };
};
