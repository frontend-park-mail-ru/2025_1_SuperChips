import { root } from 'app/app';
import type { Route } from 'shared/config/router';
import { config } from 'shared/config/router';
import { debouncedScroll } from 'pages/FeedPage';
import { Auth } from 'features/authorization';

interface AppState {
    lastPage: string | null,
    activePage: string | null,
    isShowingToast: boolean,
}

export const appState: AppState = {
    lastPage: null,
    activePage: null,
    isShowingToast: false,
};


/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * Если replace = true, не добавляет запись в историю
 */
export const navigate = async (
    page: string,
    replace = false
): Promise<void> => {
    if (root === null) { return; }

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

    if (!match) {
        match = 'feed';
    }


    let route = config.menu[match];

    if (
        route.nonAuthOnly && !!Auth.userData ||
        route.authOnly && !Auth.userData
    ) {
        match = 'feed';
        route = config.menu[match];
    }

    let renderProps;
    let newHref;

    if (match === 'profile') {
        renderProps = page;
        newHref = `/${page}`;
    } else if (match === 'flow') {
        newHref = `/flow/${page}`;
        renderProps = page.slice(5);
    } else {
        newHref = route.href.toString();
        renderProps = '';
    }

    updateBars(route);
    if (match === appState.activePage) { return; }

    if (appState.activePage === 'feed' && match !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = newHref;


    const newPage = await route.render(renderProps);
    root.innerHTML = '';
    root.appendChild(newPage);

    window.scrollTo({ top: 0 });
    document.title = route.title;

    if (replace) {
        history.replaceState({ page: page }, '', newHref);
    } else {
        appState.lastPage = newHref;
        history.pushState({ page: page }, '', newHref);
    }
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
