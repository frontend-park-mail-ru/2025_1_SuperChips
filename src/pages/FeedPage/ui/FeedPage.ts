import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { fillFeed } from '../lib/fillFeed';
import { debouncedScroll } from '../handlers/handleScroll';
import feedTemplate from './FeedPage.hbs';
import './feed.scss';

export const feedState = {
    isLoading: false,
    pageNum: 1,
};

/**
 * Генерирует страницу ленты и создает обработчики событий
 */
export const FeedPage = async () => {
    feedState.pageNum = 1;

    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    const navbar = page.querySelector('#navbar');
    if (navbar) navbar.replaceWith((await Navbar()));

    const sidebar = page.querySelector('#sidebar');
    if (sidebar) sidebar.replaceWith((await Sidebar()));

    window.addEventListener('scroll', debouncedScroll);

    const delayedFill = new MutationObserver(() => {
        fillFeed();
        delayedFill.disconnect();
    });


    const rootElement = document.getElementById('root');
    if (rootElement) {
        delayedFill.observe(rootElement, { childList: true });
    }

    return page;
};
