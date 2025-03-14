import { root } from '../../app/app';
import { config } from '../config/router';
import { debouncedScroll } from '../../pages/FeedPage/handlers/handleScroll';

export const appState = {
    activePage: null,
    isLoadingFeed: false,
};


/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = async (page) => {
    root.innerHTML = '';

    if (appState.activePage === 'feed' && page !== 'feed') {
        window.removeEventListener('scroll', debouncedScroll);
    }


    appState.activePage = page;

    history.pushState(config.menu[page].href, '', config.menu[page].href);
    document.title = config.menu[page].title;

    const element = await config.menu[page].render();
    root.appendChild(element);
};
