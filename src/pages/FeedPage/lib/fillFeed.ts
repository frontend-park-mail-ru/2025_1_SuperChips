import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import { Footer } from 'shared/components/Footer';
import { loadFeedPictures } from 'features/imageLoader';
import { feedState } from '../ui/FeedPage';


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
            is_nsfw: item.is_nsfw,
            title: item.header, // Add title for NSFW check
        };
        
        // ВРЕМЕННАЯ ЗАГЛУШКА: Проверка на наличие слова "утка" в названии для отображения как NSFW
        if (item.header && item.header.toLowerCase().includes('утка')) {
            config.is_nsfw = true;
        }
        
        feed.appendChild(Pin(config));
    });

    feedState.isLoading = false;
    feedState.pageNum++;
};

