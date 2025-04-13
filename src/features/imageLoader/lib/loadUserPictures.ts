import type { ILoadedPictures } from '../model/types';
import { API } from 'shared/api';
import { userFeedState } from 'widgets/UserPins/ui/UserPins';


export const loadUserPictures = async (page: number, boardID: string): Promise<ILoadedPictures | null> => {
    if (userFeedState.isLoading || !userFeedState.boardID) return { status: 404 };
    userFeedState.isLoading = true;

    const boardImagesRequest = await API.get(`/api/v1/boards/${boardID}/flows?page=${page}&size=20`);
    if (boardImagesRequest instanceof Error || !boardImagesRequest.ok) {
        userFeedState.isLoading = false;
        return { status: 404 };
    }

    const body = await boardImagesRequest.json();
    userFeedState.isLoading = false;

    if (!body.data) {
        return { status: 404 };
    }

    userFeedState.isLoading = false;
    return { status: boardImagesRequest.status, data: body.data };
};
