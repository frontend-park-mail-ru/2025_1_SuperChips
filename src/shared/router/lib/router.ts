import { root } from 'app/app';
import { config } from 'shared/config/router';
import { User } from 'entities/User';
import { debouncedScroll } from 'pages/FeedPage';

interface AppState {
    activePage: string | null,
    isLoadingFeed: boolean,
}

export const appState: AppState = {
    activePage: null,
    isLoadingFeed: false,
};


/**
 * Переходит на указанный URL (прим: '/feed', '/login')
 * Если replace = true, создает новую запись в истории
 */
export const goToPage = async (
    page: string,
    replace = false
): Promise<void> => {
    if (root === null) { return; }
    root.innerHTML = '';


    if ((!(page in config.menu)) || (config.menu[page]?.nonAuthOnly && User.authorized)) {
        page = 'feed';
    }

    if (appState.activePage === 'feed' && page !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = page;

    if (replace) {
        history.pushState({ page: page }, '', config.menu[page].href);
        document.title = config.menu[page].title;
    }

    const element = config.menu[page].render();
    root.appendChild(element);

    window.scrollTo({
        top: 0,
    });
};
