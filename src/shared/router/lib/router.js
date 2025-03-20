import { root } from 'app/app';
import { config } from 'shared/config/router';
import { debouncedScroll } from 'pages/FeedPage';
import { User } from 'entities/User';

export const appState = {
    activePage: null,
    isLoadingFeed: false,
};


/**
 * Переходит на указанный URL (прим: '/feed', '/login')
 * @param {string} page
 * @param {boolean} replace
 */
export const goToPage = async (page, replace = false) => {
    root.innerHTML = '';

    if ((!(page in config.menu)) || (config.menu[page]?.nonAuthOnly && User.authorized)) {
        page = '/feed';
    }

    if (appState.activePage === '/feed' && page !== '/feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }

    appState.activePage = page;

    const element = await config.menu[page].render();
    root.appendChild(element);

    window.scrollTo({
        top: 0,
    });
    document.title = config.menu[page].title;

    if (replace) {
        history.replaceState({ page: page }, '', config.menu[page].href);
    } else {
        history.pushState({ page: page }, '', config.menu[page].href);
    }
};
