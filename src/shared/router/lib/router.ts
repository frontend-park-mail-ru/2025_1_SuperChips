import { Masonry } from 'shared/models/Masonry';
import type { IUser } from 'entities/User';
import type { IPinProps } from 'entities/Pin';
import type { IBoardProps } from 'entities/Board';
import type { IUserCardProps } from 'entities/UserCard';
import { omit } from 'shared/utils';
import { findMatch } from './findMatch';
import { updateBars } from './updateBars';
import { closeFilter, closeNotifications, openFilter } from 'widgets/navbar';
import { removeScrollHandler } from 'features/scrollHandler';
import { root } from 'app/app';
import { config } from 'shared/config/router';

export type FilterType = 'boards' | 'flows' | 'users';

interface AppState {
    lastPage: string | null,
    activePage: string | null,
    href: string | null,
    isShowingToast: boolean,
    isShowingPopup: boolean,
    isFilterOpen: boolean,
    mobile: boolean,
    forceNavigate: boolean,
    lastVisited: Partial<IUser>,
    lastPin: string,
    lastScroll: number,
    loggedWithVKID: boolean,
    masonryInstance: Masonry | null,
    scrollHandler: (() => void) | null,
    chat: {
        open: boolean;
        id: string | null
        hasUnread: boolean,
    },
    notification: {
        open: boolean,
        hasUnread: boolean,
    },
    sharing: {
        open: boolean,
        id: string | null,
    },
    search: {
        page: number
        query: string,
        lastQuery: string,
        filter: FilterType,
        notFound: boolean,
        isFiltered: boolean,
        loadedPins: IPinProps[],
        loadedBoards: IBoardProps[],
        loadedUsers: IUserCardProps[]
    },
}


export const appState: AppState = {
    lastPage: null,
    activePage: null,
    href: null,
    isShowingToast: false,
    isShowingPopup: false,
    isFilterOpen: false,
    forceNavigate: false,
    lastVisited: {},
    lastPin: '',
    lastScroll: 0,
    mobile: false,
    loggedWithVKID: false,
    masonryInstance: null,
    scrollHandler: null,
    chat: {
        open: false,
        id: null,
        hasUnread: false,
    },
    sharing: {
        open: false,
        id: null,
    },
    notification: {
        open: false,
        hasUnread: false,
    },
    search: {
        page: 1,
        query: '',
        lastQuery: '',
        filter: 'flows',
        notFound: false,
        isFiltered: false,
        loadedPins: [],
        loadedBoards: [],
        loadedUsers: [],
    },
};


/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * Если replace = true, не добавляет запись в историю
 */
export const navigate = async (
    page: string,
    replace = false
): Promise<void> => {
    const match = await findMatch(page);
    const route = config.menu[match];

    // if (appState.activePage !== 'feed' && appState.lastPage !== 'feed' && feedState.loadedPins.length > 0) {
    //     feedState.loadedPins = feedState.loadedPins.slice(feedState.loadedPins.length - 120);
    // }

    appState.lastPage = appState.activePage;
    appState.activePage = match;

    const renderProps: string[] = [];
    let newHref = route.href.toString();
    let pinID = '';

    switch (match) {
    case 'pin':
        pinID = page.split('/')[1].split('?')[0];
        renderProps.push(pinID);
        newHref = `/flow/${pinID}`;
        if (page.includes('boardID=')) {
            const query = page.match(/\?boardID=(\d+)/);
            if (query) {
                const boardID = query[1];
                renderProps.push(boardID);
            }
        }
        break;
    case 'profileBoards':
    case 'profilePins':
        renderProps.push(page.split('/')[0]);
        newHref = `/${page}`;
        break;
    case 'board':
        renderProps.push(page.split('/')[1]);
        newHref = `/${page}`;
        break;
    case 'editPin':
        renderProps.push(page.split('/')[2]);
        newHref = `/${page}`;
        break;
    case 'subscriptions':
    case 'subscribers':
        renderProps.push(page);
        newHref = `/${page}`;
        break;
    case 'invite':
        newHref = `/${page}`;
        break;
    }

    if (match === appState.activePage && newHref === appState.href && !appState.forceNavigate) {
        return;
    }

    appState.forceNavigate = false;
    appState.href = newHref;
    document.title = route.title;

    const clearAppState = omit(
        appState,
        'masonryInstance',
        'scrollHandler'
    );

    if (replace) {
        history.replaceState({ ...history.state, ...clearAppState }, '', newHref);
    } else {
        history.pushState({ ...history.state, ...clearAppState }, '', newHref);
    }

    const newPage = await route.render(...renderProps);
    if (newPage) {
        cleanup(newHref);
        updateBars(route);
        root.innerHTML = '';
        root.appendChild(newPage);
        window.scrollTo({ top: 0 });
    }
};


const cleanup = (newHref: string) => {
    const boardRegex = /^\/board\/\S+$/;

    if (appState.lastPage === 'feed') {
        appState.lastScroll = window.scrollY;
    }

    if (appState.masonryInstance) {
        appState.masonryInstance.destroy();
    }

    if (appState.scrollHandler && newHref !== '/feed' && !boardRegex.test(newHref)) {
        removeScrollHandler();
    }

    if (appState.isFilterOpen) {
        const feedFilter = document.querySelector<HTMLDivElement>('.feed-filter');
        const filter = document.querySelector<HTMLElement>('#filter-button');

        if (!feedFilter || !filter) return;

        filter.removeEventListener('click', closeFilter);
        filter.addEventListener('click', openFilter);
        filter.style.content = '';

        feedFilter.remove();
        appState.isFilterOpen = false;
    }

    if (appState.notification.open) {
        closeNotifications();
        appState.notification.open = false;
    }

    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (searchInput && appState.lastPage === 'feed') {
        appState.search.lastQuery = searchInput.value;
        searchInput.value = '';
        appState.search.query = '';
        document.querySelector('.search-form__clear')?.classList.add('hidden');
    }

    closeFilter();

    if (newHref !== '/flow/new') {
        document.querySelector('#newPin')?.classList.remove('active');
    }
    if (newHref !== '/settings') {
        document.querySelector('#settings')?.classList.remove('active');
    }
};
