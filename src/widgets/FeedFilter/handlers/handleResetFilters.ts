import { fillFeed } from 'pages/FeedPage/lib/fillFeed';
import { searchFeedState } from 'pages/FeedPage';
import { registerScrollHandler } from 'features/scrollHandler';
import { closeFilter } from 'widgets/navbar';
import { Toast } from 'shared/components/Toast';

export const handleResetFilters = async () => {
    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    searchFeedState.filter = 'flows';
    searchFeedState.query = '';
    searchFeedState.page = 1;

    feed.innerHTML = '';
    await fillFeed();
    registerScrollHandler(fillFeed);

    closeFilter();
    Toast('Фильтры сброшены', 'message', 2000);
}; 