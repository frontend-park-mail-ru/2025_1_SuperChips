import { feedState } from '../ui/FeedPage';
import { debouncedScroll } from '../handlers/handleScroll';
import { Pin } from 'entities/Pin';
import { Footer } from '../components/footer/footer';
import { loadImages } from 'entities/Pin/lib/loadImages';
import { appState } from 'shared/router';


/**
 * Загружает и создает чанк картинок для ленты
 */
export const fillFeed = async () => {
    const feed = document.querySelector('#feed');
    if (!feed) return;

    const images = await loadImages(feedState.pageNum++);

    if (images === 404) {
        const rootElement = document.getElementById('root');
        if (!rootElement) return;

        rootElement.insertAdjacentHTML('beforeend', Footer().innerHTML);
        window.removeEventListener('scroll', debouncedScroll);
        appState.isLoadingFeed = false;
        return null;
    }
    if (typeof images === 'number') return;

    if (!images || !images.data) return;

    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    images.data.forEach((item) => {
        newFrame.appendChild(Pin(item.image));
    });

    feed.appendChild(newFrame);
};
