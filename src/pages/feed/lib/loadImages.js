import {API} from '../../../shared/api/api';
import {createSkeleton} from './skeleton/skeleton';

let isLoading;

export const loadImages = async () => {
    if (isLoading) return;
    isLoading = true;

    const response = await API.get('/api/v1/feed');
    const images = JSON.parse(await response.text());

    const feed = document.querySelector('#feed');
    images.data.forEach((item) => {
        feed.appendChild(createSkeleton(item.image));
    });
    isLoading = false;
};