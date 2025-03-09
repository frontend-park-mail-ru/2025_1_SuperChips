import {API} from '../../../shared/api/api';
import {createSkeleton} from './skeleton/skeleton';
import {feedState} from '../../../shared/router';
import {debouncedScroll} from './handleScroll';
import {createFooter} from './footer/createFooter';

export const loadImages = async () => {
    if (feedState.isLoading) return;
    feedState.isLoading = true;

    const response = await API.get(`/api/v1/feed?page=${feedState.pageNum++}`);
    if (!response.ok) {
        const footer = createFooter();
        window.removeEventListener('scroll', debouncedScroll);
        feedState.isLoading = false;
        feedState.pageNum = 1;
        return footer;
    }

    const images = JSON.parse(await response.text());

    const newFrame = document.createElement('div');
    images.data.forEach((item) => {
        newFrame.appendChild(createSkeleton(item.image));
    });

    feedState.isLoading = false;
    return newFrame;
};