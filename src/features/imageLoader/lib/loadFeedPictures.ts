import type { ILoadedPictures } from '../model/types';
import { debouncedFeedScroll } from 'pages/FeedPage';
import { API } from 'shared/api';
import { feedState } from 'pages/FeedPage/ui/FeedPage';


/**
 * Загружает чанк картинок для ленты
 */
export const loadFeedPictures = async (pageNum: number): Promise<ILoadedPictures | null> => {
    if (feedState.isLoading) return null;

    feedState.isLoading = true;

    const response = await API.get(`/api/v1/feed?page=${pageNum}`);
    if (response instanceof Error) {
        feedState.isLoading = false;
        return { status: 503 };
    }

    if (response.status === 404) {
        window.removeEventListener('scroll', debouncedFeedScroll);
        return { status: 404 };
    }

    const body = JSON.parse(await response.text());
    feedState.isLoading = false;

    body.status = 200;

    return body;
};
