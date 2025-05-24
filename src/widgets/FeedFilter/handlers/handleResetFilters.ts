import { fillFeed } from 'pages/FeedPage/lib/fillFeed';
import { feedState, searchFeedState } from 'pages/FeedPage';
import { registerScrollHandler } from 'features/scrollHandler';
import { closeFilter } from 'widgets/navbar';
import { Toast } from 'shared/components/Toast';
import { appState } from 'shared/router';
import { Masonry } from 'shared/models/Masonry';


export const handleResetFilters = async () => {
    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    Object.assign(searchFeedState, { filter: 'flows', query: '', page: 1 });
    Object.assign(feedState, { filter: 'flows', isLoading: false, pageNum: 1, });

    feed.innerHTML = '';

    appState.masonryInstance?.destroy();
    appState.masonryInstance = new Masonry(feed, {
        itemSelector: '.pin',
        gutter: appState.mobile ? 10 : 20,
    });

    try {
        await fillFeed();
        await fillFeed();
        registerScrollHandler(fillFeed);
        closeFilter();
        Toast('Фильтры сброшены', 'message', 2000);
    } catch {
        Toast('Ошибка при загрузке ленты', 'error');
    }
}; 
