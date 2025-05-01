import { debouncedFeedScroll, feedState, fillFeed, searchFeedScroll, searchFeedState } from 'pages/FeedPage';
import { closeFilter } from './closeFilter';
import { Masonry } from 'shared/models/Masonry';
import { appState } from 'shared/router';


export const clearSearch = async () => {
    document.querySelector('.search-form__clear')?.classList.add('hidden');
    const input = document.querySelector<HTMLInputElement>('#search');

    if (input) {
        input.value = '';
    }

    searchFeedState.filter = 'flows';
    searchFeedState.query = '';
    searchFeedState.page = 1;

    feedState.pageNum = 1;

    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    appState.masonryInstance?.destroy();
    appState.masonryInstance = new Masonry(feed, {
        itemSelector: '.pin',
        columnWidth: appState.pinWidth,
        gutter: appState.mobile ? 10 : 20,
    });

    feed.innerHTML = '';
    await fillFeed();

    if (appState.activePage === 'feed') {
        window.addEventListener('scroll', debouncedFeedScroll);
    }
    window.removeEventListener('scroll', searchFeedScroll);

    closeFilter();
};
