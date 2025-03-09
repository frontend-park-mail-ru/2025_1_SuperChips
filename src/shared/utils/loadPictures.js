import {feedState} from '../router';
import {API} from '../api/api';
import {debouncedScroll} from '../../pages/feed/lib/handleScroll';
import {createSkeleton} from '../../pages/feed/lib/skeleton/skeleton';

export const fillPictureBox = async () => {
    const newFrame = await loadImages();
    const pictureBox = document.querySelector('.picture-box');
    pictureBox.innerHTML = newFrame.innerHTML;
};

export const fillFeed = async () => {
    const feed = document.querySelector('#feed');
    const newFrame = await loadImages();
    newFrame.classList.add('feed-chunk');
    feed.appendChild(newFrame);
};

export const loadImages = async () => {
    if (feedState.isLoading) return;
    feedState.isLoading = true;

    const response = await API.get(`/api/v1/feed?page=${feedState.pageNum++}`);
    if (!response.ok) {
        window.removeEventListener('scroll', debouncedScroll);
        feedState.isLoading = false;
        feedState.pageNum = 1;
        return null;
    }

    const images = JSON.parse(await response.text());

    const newFrame = document.createElement('div');
    images.data.forEach((item) => {
        newFrame.appendChild(createSkeleton(item.image));
    });

    feedState.isLoading = false;
    return newFrame;
};