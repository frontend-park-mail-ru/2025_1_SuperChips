import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { fillFeed } from '../lib/fillFeed';
import { debouncedScroll } from '../handlers/handleScroll';
import { User } from 'entities/User';
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
