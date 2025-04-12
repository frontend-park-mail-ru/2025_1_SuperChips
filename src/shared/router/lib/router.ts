import type { Route } from 'shared/config/router';
import { config } from 'shared/config/router';
import { debouncedScroll } from 'pages/FeedPage';
import { root } from 'app/app';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';

interface AppState {
    lastPage: string | null,
    activePage: string | null,
    isShowingToast: boolean,
    isShowingPopup: boolean,
}

export const appState: AppState = {
    lastPage: null,
    activePage: null,
    isShowingToast: false,
    isShowingPopup: false,
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
    if (match === appState.activePage) {
        return;
    }

    const route = config.menu[match];

    let renderProps;
    let newHref;

    if (match === 'profile') {
        renderProps = page;
        newHref = `/${page}`;
    } else if (match === 'flow') {
        renderProps = page.slice(5);
        newHref = `/flow/${page}`;
    } else {
        renderProps = '';
        newHref = route.href.toString();
    }


    updateBars(route);

    const newPage = await route.render(renderProps);
    root.innerHTML = '';
    root.appendChild(newPage);

    window.scrollTo({ top: 0 });


    if (appState.activePage === 'feed' && newHref !== '/feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = match;
    document.title = route.title;

    if (replace) {
        history.replaceState({ page: page }, '', newHref);
    } else {
        appState.lastPage = newHref;
        history.pushState({ page: page }, '', newHref);
    }
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
    const navbar = document.querySelector('.navbar');
    const showNavbar = route.hasNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const sidebarButtons = document.querySelector<HTMLDivElement>('.sidebar__button-container');
    const showSidebar = route.hasSidebar && !!Auth.userData;
    sidebarButtons?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = route.hasBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);
};
