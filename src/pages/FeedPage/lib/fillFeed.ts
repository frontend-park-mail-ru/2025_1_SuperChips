import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import { Footer } from 'shared/components/Footer';
import { loadFeedPictures } from 'features/imageLoader';
import { feedState } from '../ui/FeedPage';

const createAdBlock = () => {
    const adContainer = document.createElement('div');
    adContainer.className = 'pin';
    adContainer.style.width = '210px';
    
    const iframe = document.createElement('iframe');
    iframe.className = 'slot';
    iframe.style.border = 'none';
    iframe.title = 'Slot preview';
    iframe.width = '210';
    iframe.height = '300';
    iframe.src = 'https://re-target.ru/api/v1/adv/iframe/1f4b7a98-c800-4d2a-a8a8-881ef6847faf';
    
    adContainer.appendChild(iframe);
    return adContainer;
};

/**
 * Загружает и создает чанк картинок для ленты
 */
export const fillFeed = async () => {
    const feed = document.querySelector('#feed');
    if (!feed) return;

    const images = await loadFeedPictures(feedState.pageNum);

    if (images?.status === 404) {
        const rootElement = document.getElementById('root');
        if (!rootElement) return;

        rootElement.insertAdjacentHTML('beforeend', Footer().innerHTML);
        feedState.isLoading = false;

        return null;
    } else if (images?.status === 503) {
        return null;
    }

    if (!images?.data) return;

    images.data.forEach((item) => {
        const config: IPinProps = {
            url: item.media_url,
            pinID: item.flow_id,
            width: item.width,
            height: item.height,
        };
        feed.appendChild(Pin(config));
    });

    if (feedState.pageNum % 3 === 0) {
        feed.appendChild(createAdBlock());
    }

    feedState.isLoading = false;
    feedState.pageNum++;
};

