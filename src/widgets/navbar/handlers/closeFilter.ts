import { openFilter } from './openFilter';
import { appState } from 'shared/router';
import { toggleScroll } from 'widgets/BoardPopup';


export const closeFilter = () => {
    if (appState.activePage !== 'feed') return;
    const feed = document.querySelector('#feed');
    const feedFilter = document.querySelector<HTMLDivElement>('.feed-filter');
    const filterPlaceholder = document.querySelector('.feed-filter-placeholder');

    if (appState.mobile) {
        toggleScroll('enabled');
    }

    if (!feed || !feedFilter) return;

    feedFilter.style.position = '';
    feedFilter.style.animation = 'FadeOutHorizontalLeft 0.3s ease-out';

    const filter = document.querySelector('#filter-button') ||
        document.querySelector<HTMLElement>('.navbar__search-icon');

    filter?.addEventListener('click', openFilter);
    filter?.removeEventListener('click', closeFilter);

    setTimeout(() => {
        filterPlaceholder?.remove();
        appState.isFilterOpen = false;
    }, 300);
};
