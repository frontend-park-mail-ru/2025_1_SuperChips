import { openFilter } from './openFilter';
import { appState } from 'shared/router';


export const closeFilter = () => {
    if (appState.activePage !== 'feed') return;
    const feed = document.querySelector('#feed');
    const feedFilter = document.querySelector<HTMLDivElement>('.feed-filter');
    const filterPlaceholder = document.querySelector('.feed-filter-placeholder');

    if (!feed || !feedFilter) return;

    if (appState.mobile) {
        const goBack = document.querySelector<HTMLButtonElement>('#go-back-button');
        if (goBack) goBack.disabled = false;
    }

    feedFilter.style.position = '';
    feedFilter.style.animation = 'FadeOutHorizontalLeft 0.3s ease-out';

    const filter = document.querySelector<HTMLElement>('#filter-button');

    if (filter) {
        filter.removeEventListener('click', closeFilter);
        filter.addEventListener('click', openFilter);
        filter.style.content = '';
    }

    setTimeout(() => {
        filterPlaceholder?.remove();
        appState.isFilterOpen = false;
    }, 300);
};
