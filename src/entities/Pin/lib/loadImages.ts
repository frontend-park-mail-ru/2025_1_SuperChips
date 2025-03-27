import { appState } from 'shared/router';
import { API } from 'shared/api/api';
import { ILoadedImages } from '../model/types';


/**
 * Загружает чанк картинок для ленты
 */
export const loadImages = async (pageNum: number): Promise<ILoadedImages | number | null> => {
    if (appState.isLoadingFeed) return null;
    appState.isLoadingFeed = true;

    const response = await API.get(`/api/v1/feed?page=${pageNum}`);
    if (response instanceof Error) return null;
    if (!response.ok) return response.status;

    const images = JSON.parse(await response.text());
    appState.isLoadingFeed = false;

    return images;
};
