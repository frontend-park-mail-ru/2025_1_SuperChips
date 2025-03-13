import { loadImages } from '../../../shared/utils/loadPictures';
import { debounce } from '../../../shared/utils/debounce';
import { Footer } from '../components/footer/footer';


/**
 * Загружает новые картинки для ленты, когда пользователь достигает определенной высоты
 * @returns {Promise<void>}
 */
const scrollHandler = async () => {
    const threshold = 500;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

    if (scrolledToBottom) {
        const newFrame = await loadImages();
        if (newFrame !== null) {
            newFrame.classList.add('feed-chunk');
            const feed = document.querySelector('#feed');
            feed.appendChild(newFrame);
        } else {
            document.getElementById('root').insertAdjacentHTML('beforeend', Footer().innerHTML);
        }
    }
};

export const debouncedScroll = debounce(scrollHandler, 75);