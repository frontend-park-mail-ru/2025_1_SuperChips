import { root } from '../../app/app';
import { config } from '../config/router';
import { fillFeed, fillPictureBox } from '../utils/loadPictures';

export const appState = {
    activePage: null,
};

export const feedState = {
    isLoading: false,
    pageNum: 1,
};


/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = async (page) => {
    root.innerHTML = '';

    appState.activePage = page;
    switch (page) {
    case 'login': feedState.pageNum = 1; break;
    case 'signup': feedState.pageNum = 2; break;
    case 'feed': feedState.pageNum = 1; break;
    }

    const element = await config.menu[page].render();

    history.pushState(config.menu[page].href, '', config.menu[page].href);
    document.title = config.menu[page].title;

    root.appendChild(element);

    if (page === 'login' || page === 'signup') {
        await fillPictureBox();
    } else if (page === 'feed') {
        await fillFeed();
        await fillFeed();
    }
};

export const UrlHandler = (event) => {
    // event.preventDefault();
    // const URL = window.location.href;
    alert(123);
};
