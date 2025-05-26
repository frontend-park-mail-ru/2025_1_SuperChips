import type { IPinProps } from 'entities/Pin/model/types';
import { loadUserPictures } from 'features/imageLoader';
import { navigate } from 'shared/router';
import { Pin } from 'entities/Pin';
import { emptyFeedPageTemplate } from 'widgets/UserPins';
import { boardFeedState } from '../ui/BoardPage';
import { removeScrollHandler } from 'features/scrollHandler';


export const fillBoardFeed = async () => {
    const feed = document.querySelector('#feed');
    if (!feed) return;

    const pictures = await loadUserPictures(boardFeedState.page, boardFeedState.boardID);
    const own = boardFeedState.own;

    if (pictures?.status === 404 && boardFeedState.page === 1) {
        feed.innerHTML = emptyFeedPageTemplate({ own: own });

        const btn = feed.querySelector('.go-to-feed');
        btn?.addEventListener('click', () => {
            navigate('feed').finally();
        });
    }

    if (pictures?.status === 404) {
        removeScrollHandler();
        return;
    }

    if (!pictures?.data) return;

    pictures.data.forEach((item) => {
        const config: IPinProps = {
            ...boardFeedState,
            url: item.media_url,
            pinID: item.flow_id,
            saved: own,
            width: item.width,
            height: item.height,
            title: item.header, // Add title for NSFW check
        };
        
        // ВРЕМЕННАЯ ЗАГЛУШКА: Проверка на наличие слова "утка" в названии для отображения как NSFW
        if (item.header && item.header.toLowerCase().includes('утка')) {
            config.is_nsfw = true;
        }
        
        feed.insertBefore(Pin(config), feed.firstChild);
    });
    boardFeedState.page++;
};

