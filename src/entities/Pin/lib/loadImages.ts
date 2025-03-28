import { appState } from 'shared/router';
import { API } from 'shared/api/api';
import { ILoadedImages } from '../model/types';
import { ErrorToast } from 'shared/components/errorToast';


/**
 * Загружает чанк картинок для ленты
 */
export const loadImages = async (pageNum: number): Promise<ILoadedImages | null> => {
    if (appState.isLoadingFeed) return null;
    appState.isLoadingFeed = true;

    const response = await API.get(`/api/v1/feed?page=${pageNum}`);
    if (response instanceof Error) return null;

    if (!response.ok) {
        const body = await response.json();

        if (body.description !== 'Not Found') {
            ErrorToast('Ошибка при получении данных. Попробуйте еще раз');
        }

        return {
            status: 404,
        };
    }

    const images = JSON.parse(await response.text());
    appState.isLoadingFeed = false;

    images.status = 200;

    return images;
};
