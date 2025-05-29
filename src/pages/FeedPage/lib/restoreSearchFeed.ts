import { Masonry } from 'shared/models/Masonry';
import type { FilterType } from 'shared/router';
import { appState } from 'shared/router';
import { Pin } from 'entities/Pin';
import { Board } from 'entities/Board';
import { UserCard } from 'entities/UserCard';
import { fillSearchFeed } from './fillSearchFeed';
import { registerScrollHandler } from 'features/scrollHandler';


export const restoreSearchFeed = () => {
    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    appState.search.query = appState.search.lastQuery;

    const selectorMap: Record<FilterType, string> = {
        boards: '.board-container',
        flows: '.pin',
        users: '.user-card',
    };

    const filter = appState.search.filter;
    const itemSelector = selectorMap[filter];

    appState.masonryInstance?.destroy();
    appState.masonryInstance = new Masonry(feed, {
        itemSelector: itemSelector,
        gutter: appState.mobile ? 10 : 20,
    });

    switch (appState.search.filter) {
    case 'flows':
        appState.search.loadedPins.forEach(pin => feed.appendChild(Pin(pin)));
        break;
    case 'boards':
        appState.search.loadedBoards.forEach(board => feed.appendChild(Board(board)));
        break;
    case 'users':
        appState.search.loadedUsers.forEach(user => feed.appendChild(UserCard(user)));
        break;
    }

    if (!appState.search.notFound) {
        registerScrollHandler(fillSearchFeed);
    }

    setTimeout(() => {
        window.scrollTo({ top: appState.lastScroll });
        const searchBar = document.querySelector<HTMLInputElement>('#search');
        if (searchBar) {
            searchBar.value = appState.search.lastQuery;
        }
        document.querySelector('#clear-search')?.classList.remove('hidden');
    });
};
