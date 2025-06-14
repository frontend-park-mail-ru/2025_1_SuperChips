import { feedState, fillFeed } from 'pages/FeedPage';
import { registerScrollHandler } from 'features/scrollHandler';
import { closeFilter } from './closeFilter';
import { Masonry } from 'shared/models/Masonry';
import { appState } from 'shared/router';


export const clearSearch = async () => {
    document.querySelector('.search-form__clear')?.classList.add('hidden');
    const input = document.querySelector<HTMLInputElement>('#search');
    appState.search.isFiltered = false;

    if (input) {
        input.value = '';
    }

    if (appState.search.page > 1) {
        Object.assign(appState.search, { filter: 'flows', query: '', page: 1 });

        feedState.pageNum = 1;

        const feed = document.querySelector<HTMLElement>('#feed');
        if (!feed) return;

        feed.innerHTML = '';

        appState.masonryInstance?.destroy();
        appState.masonryInstance = new Masonry(feed, {
            itemSelector: '.pin',
            gutter: appState.mobile ? 10 : 20,
        });

        await fillFeed();

        if (appState.activePage === 'feed') {
            registerScrollHandler(fillFeed);
        }

        closeFilter();
    }
};
