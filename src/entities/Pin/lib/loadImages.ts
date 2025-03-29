import { appState } from 'shared/router';
import { API } from 'shared/api/api';
import { ILoadedImages } from '../model/types';
import { ErrorToast } from 'shared/components/errorToast';
import { feedState } from 'pages/FeedPage/ui/FeedPage';


const MAX_RETRIES = 5;
const DELAY = 3000;

/**
 * Загружает чанк картинок для ленты
 */
export const loadImages = async (pageNum: number): Promise<ILoadedImages | null> => {
    if (appState.isLoadingFeed) return null;
    appState.isLoadingFeed = true;

    const response = await API.get(`/api/v1/feed?page=${pageNum}`);
    if (response instanceof Error) {
        ErrorToast('Ошибка при получении данных. Попробуйте еще раз');
        appState.isLoadingFeed = false;
        return { status: 503 };
    }

    const body = JSON.parse(await response.text());
    appState.isLoadingFeed = false;

    if (body?.description === 'Not Found') {
        return { status: 404 };
    }

    body.status = 200;

    return body;
};


export const retryLoadImages = async () => {
    for (let attempt = 1; attempt < MAX_RETRIES; attempt++) {
        await new Promise(resolve => setTimeout(resolve, DELAY));

        const response = await loadImages(feedState.pageNum);
        if (response?.status === 200) {
            return response;
        }
    }
    return { status: 503 };
};
