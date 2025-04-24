import type { IFeed } from 'pages/FeedPage';
import { openFilter } from './openFilter';
import { appState } from 'shared/router';


export const closeFilter = () => {
    if (appState.activePage !== 'feed' || !appState.isFilterOpen) return;
    const feed = document.querySelector<IFeed>('#feed');
    const feedFilter = document.querySelector<HTMLDivElement>('.feed-filter');
    const filterPlaceholder = document.querySelector('.feed-filter-placeholder');

    if (!feed || !feedFilter) return;

    feedFilter.style.position = '';
    feedFilter.style.animation = 'FilterFadeOut 0.2s ease-out';

    const filter = document.querySelector('#filter-button');
    filter?.addEventListener('click', openFilter);
    filter?.removeEventListener('click', closeFilter);

    setTimeout(() => {
        filterPlaceholder?.remove();
        if (feed.masonry) {
            feed.masonry.layout();
        }
        appState.isFilterOpen = false;
    }, 200);
};
