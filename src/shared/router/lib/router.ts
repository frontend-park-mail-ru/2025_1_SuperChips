import type { Route } from 'shared/config/router';
import { config } from 'shared/config/router';
import type { IFeed } from 'pages/FeedPage';
import { debouncedFeedScroll } from 'pages/FeedPage';
import { root } from 'app/app';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';

interface AppState {
    lastPage: string | null,
    activePage: string | null,
    href: string | null,
    isShowingToast: boolean,
    isShowingPopup: boolean,
    lastTab: string | null,
    activeTab: string | null,
}

export const appState: AppState = {
    lastPage: null,
    activePage: null,
    href: null,
    isShowingToast: false,
    isShowingPopup: false,
    lastTab: null,
    activeTab: null,
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

    let renderProps;
    let newHref;
    let newTab;

    if (match === 'profile') {
        renderProps = page;
        newHref = `/${page}`;
    } else if (match === 'pin') {
        renderProps = page.slice(5);
        newHref = `/${page}`;
    } else if (match === 'board') {
        renderProps = page.slice(6);
        newHref = `/${page}`;
    } else if (match === 'editPin') {
        renderProps = page.slice(10);
        newHref = `/${page}`;
    } else {
        renderProps = '';
        newHref = route.href.toString();
    }

    if (/^board\/\S+$/.test(page)) {
        newTab = 'boards';
    } else if (/^flow\/[a-zA-Z0-9]+$/.test(page)) {
        newTab = 'pins';
    } else {
        newTab = null;
    }

    if (match === appState.activePage && newHref === appState.href) {
        return;
    }


    if (appState.activePage === 'feed' && newHref !== '/feed') {
        window.removeEventListener('scroll', debouncedFeedScroll);
    }

    appState.lastPage = appState.activePage;
    appState.activePage = match;
    appState.lastTab = appState.activeTab;
    appState.activeTab = newTab;

    document.title = route.title;

    if (replace) {
        history.replaceState({ ...history.state, ...appState }, '', newHref);
    } else {
        history.pushState({ ...history.state, ...appState }, '', newHref);
    }

    window.scrollTo({ top: 0 });
    updateBars(route);
    cleanup();
    const newPage = await route.render(renderProps);
    root.innerHTML = '';
    root.appendChild(newPage);
};


const findMatch = async (page: string) => {
    let match = null;

    for (const [key, route] of Object.entries(config.menu)) {
        if (typeof route.href === 'string' && route.href.slice(1) === page) {
            match = key;
            break;
        } else if (route.href instanceof RegExp && route.href.test(page)) {
            match = key;
            break;
        }
    }

    if (
        !match ||
        config.menu[match].nonAuthOnly && !!Auth.userData ||
        config.menu[match].authOnly && !Auth.userData
    ) {
        match = 'feed';
    }


    if (match === 'profile') {
        const userExists = await API.get(`/api/v1/users/${page}`);
        if (userExists instanceof Error || !userExists.ok) {
            match = 'feed';
        }
    }
    return match;
};


const updateBars = (route: Route) => {
    const navbar = document.querySelector<HTMLDivElement>('.navbar');
    const showNavbar = route.hasNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0 && navbar) {
        navbar.style.paddingRight = `${scrollbarWidth}px`;
    } else if (scrollbarWidth <= 0 && navbar) {
        navbar.style.paddingRight = '0';
    }

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = route.hasSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = route.hasBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);
};


const cleanup = () => {
    const feed = document.querySelector<IFeed>('#feed');
    if (feed?.masonry) {
        feed.masonry.destroy();
    }
};
