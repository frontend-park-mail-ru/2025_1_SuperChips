import type { IFeed } from 'pages/FeedPage';
import { debouncedFeedScroll } from 'pages/FeedPage';
import type { IUser } from 'entities/User';
import { findMatch } from './findMatch';
import { updateBars } from './updateBars';
import { boardFeedScroll } from 'pages/BoardPage';
import { root } from 'app/app';
import { config } from 'shared/config/router';

interface AppState {
    lastPage: string | null,
    activePage: string | null,
    href: string | null,
    isShowingToast: boolean,
    isShowingPopup: boolean,
    lastVisited: Partial<IUser>,
}

export const appState: AppState = {
    lastPage: null,
    activePage: null,
    href: null,
    isShowingToast: false,
    isShowingPopup: false,
    lastVisited: {},
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
    case 'profile':
        renderProps = page;
        newHref = `/${page}/boards`;
        appState.activePage = 'profileBoards';
        break;
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
    }

    if (match === appState.activePage && newHref === appState.href) {
        return;
    }

    appState.href = newHref;
    document.title = route.title;

    if (replace) {
        history.replaceState({ ...history.state, ...appState }, '', newHref);
    } else {
        history.pushState({ ...history.state, ...appState }, '', newHref);
    }

    const newPage = await route.render(renderProps);
    if (newPage) {
        root.innerHTML = '';
        root.appendChild(newPage);
        window.scrollTo({ top: 0 });
        updateBars(route);
        cleanup(newHref);
    }
};


const cleanup = (newHref: string) => {
    const feed = document.querySelector<IFeed>('#feed');
    const boardRegex = /^board\/\S+$/;
    if (feed?.masonry) {
        feed.masonry.destroy();
    }

    if (newHref !== '/feed') {
        window.removeEventListener('scroll', debouncedFeedScroll);
    }
    if (!boardRegex.test(newHref)) {
        window.removeEventListener('scroll', boardFeedScroll);
    }
};
