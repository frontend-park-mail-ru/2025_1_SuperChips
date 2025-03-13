import { loadImages } from '../../../shared/utils/loadPictures';
import { debounce } from '../../../shared/utils/debounce';
import { Footer } from '../components/footer/footer';
import { feedState } from '../../../shared/router/router';


/**
 * Загружает новые картинки для ленты, когда пользователь достигает определенной высоты
 * @returns {Promise<void>}
 */
const scrollHandler = async () => {
    const threshold = 700;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

    if (scrolledToBottom && !feedState.isLoading) {
        const newFrame = await loadImages();
        if (newFrame && newFrame?.classList !== null) {
            newFrame.classList.add('feed-chunk');
            const feed = document.querySelector('#feed');
            feed.appendChild(newFrame);
        } else {
            document.getElementById('root').insertAdjacentHTML('beforeend', Footer().innerHTML);
        }
    }
};

export const debouncedScroll = debounce(scrollHandler, 75);
