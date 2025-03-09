import {loadImages} from './loadImages';
import {debounce} from '../../../shared/utils/debounce';

const scrollHandler = async () => {
    const threshold = 500;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

    if (scrolledToBottom) {
        const newFrame = await loadImages();
        const feed = document.querySelector('#feed');
        feed.insertAdjacentHTML('beforeend', newFrame.innerHTML);
    }
};

export const debouncedScroll = debounce(scrollHandler, 300);