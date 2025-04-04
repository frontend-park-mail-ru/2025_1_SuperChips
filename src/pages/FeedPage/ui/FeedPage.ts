import { fillFeed } from '../lib/fillFeed';
import { debouncedScroll } from '../handlers/handleScroll';
import { Masonry } from 'shared/models/Masonry';
import feedTemplate from './FeedPage.hbs';
import './feed.scss';

export const feedState = {
    isLoading: false,
    pageNum: 1,
};

export interface IFeed extends HTMLDivElement {
    masonry: Masonry | null;
}

/**
 * Генерирует страницу ленты и создает обработчики событий
 */
export const FeedPage = async () => {
    feedState.pageNum = 1;

    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    const scrollButton = page.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', debouncedScroll);

    const delayedFill = new MutationObserver(async () => {
        const feed = document.querySelector<IFeed>('.feed');
        if (!feed) return;
        feed.masonry = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: 205,
                gutter: 20,
            }
        );

        await fillFeed();
        delayedFill.disconnect();
    });


    const rootElement = document.getElementById('root');
    if (rootElement) {
        delayedFill.observe(rootElement, { childList: true });
    }

    return page;
};

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
