import { FeedFilter } from 'widgets/FeedFilter';
import { closeFilter } from './closeFilter';
import { appState } from 'shared/router';
import { root } from 'app/app';


export const openFilter = () => {
    if (appState.activePage !== 'feed' || appState.isFilterOpen) return;
    appState.isFilterOpen = true;

    root.appendChild(FeedFilter());

    const filter = document.querySelector<HTMLElement>('#filter-button') ||
        document.querySelector<HTMLElement>('.navbar__search-icon');
    if (filter) {
        filter.removeEventListener('click', openFilter);
        filter.addEventListener('click', closeFilter);
        filter.style.content = '';
    }
};
