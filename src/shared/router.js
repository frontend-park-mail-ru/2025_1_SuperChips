import { root } from '../app/app.js';
import { config } from './config/router';

const appState = {
    activePageLink: null,
};

/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = (page) => {
    root.innerHTML = '';

    appState.activePageLink = page;

    const element = config.menu[page].render();

    history.pushState(config.menu[page].href, '', config.menu[page].href);
    document.title = config.menu[page].title;

    root.appendChild(element);
};
