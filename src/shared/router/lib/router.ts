import { root } from 'app/app';
import { config } from 'shared/config/router';
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
    root.innerHTML = '';

    if ((!(page in config.menu)) || (config.menu[page]?.nonAuthOnly && !!Auth.userData)) {
        page = 'feed';
    }

    if (appState.activePage === 'feed' && page !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = page;

    const element = await config.menu[page].render();
    root.appendChild(element);

    const navbar = document.querySelector('.navbar');
    const showNavbar = config.menu[page].hasNavbar;
    navbar?.classList.toggle('display-none', !showNavbar);

    const sidebar = document.querySelector<HTMLDivElement>('.sidebar');
    const showSidebar = config.menu[page].hasSidebar && !!Auth.userData;
    sidebar?.classList.toggle('display-none', !showSidebar);


    window.scrollTo({ top: 0 });
    document.title = config.menu[page].title;

    if (replace) {
        history.replaceState({ page: page }, '', config.menu[page].href);
    } else {
        history.pushState({ page: page }, '', config.menu[page].href);
    }
};
