import { appState } from '../../../shared/router/router';
import { feedState } from '../ui/FeedPage';
import { debouncedScroll } from '../handlers/handleScroll';
import { Footer } from '../components/footer/footer';
import { FeedCard } from '../../../entities/FeedCard';
import { loadImages } from '../../../shared/utils/loadImages';


/**
 * Загружает и создает чанк картинок для ленты
 * @returns {Promise<void>}
 */
export const fillFeed = async () => {
    const feed = document.querySelector('#feed');
    const images = await loadImages(feedState.pageNum++);

    if (images === 404) {
        document.getElementById('root').insertAdjacentHTML('beforeend', Footer().innerHTML);
        window.removeEventListener('scroll', debouncedScroll);
        appState.isLoadingFeed = false;
        return null;
    }
    if (images === null) return;

    const newFrame = document.createElement('div');
    newFrame.classList.add('feed-chunk');

    images.data.forEach((item) => {
        newFrame.appendChild(FeedCard(item.image));
    });

    feed.appendChild(newFrame);
};
