import { FeedFilter } from 'widgets/FeedFilter';
import { closeFilter } from './closeFilter';
import { closeChatList } from 'widgets/sidebar';
import { appState } from 'shared/router';
import { root } from 'app/app';


export const openFilter = () => {
    if (appState.activePage !== 'feed' || appState.isFilterOpen) return;
    appState.isFilterOpen = true;

    if (appState.chat.open) {
        closeChatList();
        appState.chat.open = false;
    }

    root.appendChild(FeedFilter());

    const filter = document.querySelector<HTMLElement>('#filter-button');
    if (filter) {
        filter.removeEventListener('click', openFilter);
        filter.addEventListener('click', closeFilter);
        filter.style.content = 'url(\'/public/icons/filter-filled.svg\')';
    }
};
