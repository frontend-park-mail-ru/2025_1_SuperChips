import { Masonry } from 'shared/models/Masonry';
import type { IUser } from 'entities/User';
import { omit } from 'shared/utils';
import { findMatch } from './findMatch';
import { updateBars } from './updateBars';
import { searchFeedState } from 'pages/FeedPage';
import { root } from 'app/app';
import { config } from 'shared/config/router';
import { removeScrollHandler } from 'features/scrollHandler';


interface AppState {
    lastPage: string | null,
    activePage: string | null,
    href: string | null,
    isShowingToast: boolean,
    isShowingPopup: boolean,
    isFilterOpen: boolean,
    mobile: boolean,
    lastVisited: Partial<IUser>,
    loggedWithVKID: boolean,
    masonryInstance: Masonry | null,
    scrollHandler: (() => void) | null,
}

export const appState: AppState = {
    lastPage: null,
    activePage: null,
    href: null,
    isShowingToast: false,
    isShowingPopup: false,
    isFilterOpen: false,
    lastVisited: {},
    mobile: false,
    loggedWithVKID: false,
    masonryInstance: null,
    scrollHandler: null,
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

    appState.lastPage = appState.activePage;
    appState.activePage = match;

    let renderProps = '';
    let newHref = route.href.toString();

    switch (match) {
    case 'pin':
        renderProps = page.split('/')[1];
        newHref = `/${page}`;
        break;
    case 'board':
        renderProps = page.split('/')[1];
        newHref = `/${page}`;
        break;
    case 'editPin':
        renderProps = page.split('/')[2];
        newHref = `/${page}`;
        break;
    case 'profileBoards':
        renderProps = page.split('/')[0];
        newHref = `/${page}`;
        break;
    case 'profilePins':
        renderProps = page.split('/')[0];
        newHref = `/${page}`;
        break;
    case 'subscriptions':
    case 'subscribers':
        renderProps = page;
        newHref = `/${page}`;
        break;
    }

    if (match === appState.activePage && newHref === appState.href) {
        return;
    }

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

    const newPage = await route.render(renderProps);
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

    if (appState.masonryInstance) {
        appState.masonryInstance.destroy();
    }

    if (appState.scrollHandler && newHref !== '/feed' && !boardRegex.test(newHref)) {
        removeScrollHandler();
    }

    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (searchInput && appState.lastPage === 'feed') {
        searchInput.value = '';
        searchFeedState.query = '';
        document.querySelector('.search-form__clear')?.classList.add('hidden');
    }

    const filter = document.querySelector('.feed-filter-placeholder');
    filter?.remove();
    appState.isFilterOpen = false;
};
