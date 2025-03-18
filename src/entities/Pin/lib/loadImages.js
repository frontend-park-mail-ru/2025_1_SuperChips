import { appState } from 'shared/router/router';
import { API } from 'shared/api/api';

/**
 * Загружает чанк картинок для ленты
 * @returns {Promise<null|number|Object>}
 */
export const loadImages = async (pageNum) => {
    if (appState.isLoadingFeed) return null;
    appState.isLoadingFeed = true;

    const response = await API.get(`/api/v1/feed?page=${pageNum}`);
    if (!response.ok) return response.status;
    const images = JSON.parse(await response.text());
    appState.isLoadingFeed = false;

    return images;
};
