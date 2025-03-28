import { User } from 'entities/User';
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
 * @returns {HTMLDivElement}
 */
export const FeedPage = async () => {
    feedState.pageNum = 1;

    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith((await Navbar()));

    if (User.authorized) {
        page.querySelector('#sidebar').replaceWith(await Sidebar());
    }

    window.addEventListener('scroll', debouncedScroll);

    const delayedFill = new MutationObserver(() => {
        fillFeed();
        delayedFill.disconnect();
    });

    delayedFill.observe(document.getElementById('root'), { childList: true });

    return page;
};
