import type { IFeed } from 'pages/FeedPage';
import { debouncedFeedScroll, feedState, fillFeed, searchFeedScroll, searchFeedState } from 'pages/FeedPage';
import { closeFilter } from './closeFilter';
import { Masonry } from '../../../shared/models/Masonry';
import { appState } from '../../../shared/router';
import { PIN_WIDTH, PIN_WIDTH_MOBILE } from '../../../shared/config/constants';


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

    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    feed.masonry?.destroy();
    feed.masonry = new Masonry(feed, {
        itemSelector: '.pin',
        columnWidth: appState.mobile ? PIN_WIDTH_MOBILE : PIN_WIDTH,
    });

    feed.innerHTML = '';
    await fillFeed();

    if (appState.activePage === 'feed') {
        window.addEventListener('scroll', debouncedFeedScroll);
    }
    window.removeEventListener('scroll', searchFeedScroll);

    closeFilter();
};
