import type { IFeed } from 'pages/FeedPage';
import { openFilter } from './openFilter';
import { appState } from 'shared/router';


export const closeFilter = () => {
    if (appState.activePage !== 'feed' || !appState.isFilterOpen) return;
    appState.isFilterOpen = false;
    const feed = document.querySelector<IFeed>('#feed');

    if (!feed) return;

    const feedFilter = document.querySelector('#feed-filter');
    feedFilter?.remove();


    if (feed.masonry) {
        feed.masonry.layout();
    }

    const filter = document.querySelector('#filter-button');
    filter?.addEventListener('click', openFilter);
    filter?.removeEventListener('click', closeFilter);
};
