import type { IFeed } from 'pages/FeedPage';
import { FeedFilter } from 'widgets/FeedFilter';
import { closeFilter } from './closeFilter';
import { appState } from 'shared/router';


export const openFilter = () => {
    if (appState.activePage !== 'feed' || appState.isFilterOpen) return;
    appState.isFilterOpen = true;
    const feedContainer = document.querySelector('.feed-container');
    const feed = document.querySelector<IFeed>('#feed');
    if (!feedContainer || !feed) return;

    feedContainer.insertAdjacentElement('afterbegin', FeedFilter());

    if (feed.masonry) {
        feed.masonry.layout();
    }

    const filter = document.querySelector('#filter-button');
    filter?.removeEventListener('click', openFilter);
    filter?.addEventListener('click', closeFilter);
};
