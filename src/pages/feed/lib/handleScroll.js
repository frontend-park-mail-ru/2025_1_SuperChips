import {loadImages} from './loadImages';
import {debounce} from '../../../shared/utils/debounce';

const scrollHandler = async () => {
    const threshold = 500;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

    if (scrolledToBottom) {
        await loadImages();
    }
};

export const debouncedScroll = debounce(scrollHandler(), 500);