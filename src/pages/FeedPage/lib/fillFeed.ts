import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import { Footer } from '../components/footer/footer';
import { loadFeedPictures } from 'features/imageLoader';
import { feedState } from '../ui/FeedPage';
import { Auth } from '../../../features/authorization';


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
        };
        feed.appendChild(Pin(config));
    });

    feedState.isLoading = false;
    feedState.pageNum++;


    if (feedState.pageNum === 5) {
        if (!localStorage.getItem('CSAT1')) {
            localStorage.setItem('CSAT1', '123');
            const frame = document.querySelector<HTMLIFrameElement>('#CSAT-frame');
            frame?.contentWindow?.postMessage({
                type: 'render-iframe',
                data: { poll: Auth.pollList[0] }
            }, '*');
            if (frame) {
                frame.classList.remove('display-none');
                frame.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 20px;
    border: none;
    width: 520px;
    height: 250px;
    z-index: 9999;`;
            }
        }
    }
};

