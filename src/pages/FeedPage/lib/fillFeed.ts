import { feedState } from '../ui/FeedPage';
import { debouncedScroll } from '../handlers/handleScroll';
import { Pin } from 'entities/Pin';
import { Footer } from '../components/footer/footer';
import { loadImages, retryLoadImages } from 'entities/Pin';
import { appState } from 'shared/router';


/**
 * Загружает и создает чанк картинок для ленты
 */
export const fillFeed = async () => {
    const feed = document.querySelector('#feed');
    if (!feed) return;

    let images = await loadImages(feedState.pageNum);

    if (images?.status === 404) {
        const rootElement = document.getElementById('root');
        if (!rootElement) return;

        rootElement.insertAdjacentHTML('beforeend', Footer().innerHTML);
        window.removeEventListener('scroll', debouncedScroll);
        appState.isLoadingFeed = false;

        return null;
    } else if (images?.status === 503) {
        images = await retryLoadImages();

        if (images?.status !== 200) {
            return null;
        }
    }

    if (!images?.data) return;

    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    images.data.forEach((item) => {
        newFrame.appendChild(Pin(item.image));
    });

    feed.appendChild(newFrame);

    appState.isLoadingFeed = false;
    feedState.pageNum++;
};

