import {loadImages} from './loadImages';
import {debounce} from '../../../shared/utils/debounce';

const scrollHandler = async () => {
    const threshold = 500;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

    if (scrolledToBottom) {
        const newFrame = await loadImages();
        const feed = document.querySelector('#feed');
        if (newFrame.querySelector('#footer') === null) {
            feed.insertAdjacentHTML('beforeend', newFrame.innerHTML);
        } else {
            // document.querySelector('.main-page').insertAdjacentHTML('beforeend',newFrame.innerHTML);
            document.getElementById('root').insertAdjacentHTML('beforeend', newFrame.innerHTML);
        }
    }
};

export const debouncedScroll = debounce(scrollHandler, 300);