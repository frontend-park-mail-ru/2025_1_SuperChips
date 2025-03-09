import {root} from '../app/app';
import {config} from './config/router';

const appState = {
    activePageLink: null,
};

export const feedState = {
    isLoading: false,
    pageNum: 1
};


/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = async (page) => {
    root.innerHTML = '';

    appState.activePageLink = page;
    feedState.pageNum = 1;

    const element = await config.menu[page].render();

    history.pushState(config.menu[page].href, '', config.menu[page].href);
    document.title = config.menu[page].title;

    root.appendChild(element);
};
