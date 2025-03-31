import { root } from 'app/app';
import { config } from 'shared/config/router';
import type { Route } from 'shared/config/router';
import { debouncedScroll } from 'pages/FeedPage';
import { Auth } from 'features/authorization';

interface AppState {
    activePage: string | null,
    isShowingToast: boolean,
}

export const appState: AppState = {
    activePage: null,
    isShowingToast: false,
};


/**
 * Переходит на указанный URL (прим: '/feed', '/login')
 * Если replace = true, создает новую запись в истории
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

    updateBars(route);
    if (match === appState.activePage) { return; }

    if (appState.activePage === 'feed' && match !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = match;

    root.innerHTML = '';

    const newPage = await route.render(null);
    root.appendChild(newPage);

    window.scrollTo({ top: 0 });
    document.title = route.title;

    if (replace) {
        history.replaceState({ page: page }, '', route.href.toString());
    } else {
        history.pushState({ page: page }, '', route.href.toString());
    }
};


const updateBars = (route: Route) => {
    const navbar = document.querySelector('.navbar');
    const showNavbar = route.hasNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const sidebar = document.querySelector<HTMLDivElement>('.sidebar');
    const showSidebar = route.hasSidebar && !!Auth.userData;
    sidebar?.classList.toggle('display-none', !showSidebar);

    const backButton = document.getElementById('go-back-button');
    const showBackButton = route.hasBackButton;
    backButton?.classList.toggle('hidden', !showBackButton);
};
