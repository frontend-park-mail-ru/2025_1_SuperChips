import type { ILoadedPictures } from '../model/types';
import { API } from 'shared/api';
import { feedState } from 'pages/FeedPage/ui/FeedPage';
import { removeScrollHandler } from 'features/scrollHandler';


/**
 * Загружает чанк картинок для ленты
 */
export const loadFeedPictures = async (pageNum: number): Promise<ILoadedPictures | null> => {
    if (feedState.isLoading) return null;

    feedState.isLoading = true;

    const response = await API.get(`/feed?page=${pageNum}`);
    if (response instanceof Error) {
        feedState.isLoading = false;
        return { status: 503 };
    }

    if (response.status === 404) {
        removeScrollHandler();
        return { status: 404 };
    }

    const body = JSON.parse(await response.text());
    feedState.isLoading = false;

    body.status = 200;

    return body;
};
