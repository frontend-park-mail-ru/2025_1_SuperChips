import { Masonry } from 'shared/models/Masonry';
import { fillFeed } from '../lib/fillFeed';
import { debouncedFeedScroll } from '../handlers/handleScroll';
import { appState } from 'shared/router';
import feedTemplate from './FeedPage.hbs';
import './feed.scss';

export const feedState = {
    isLoading: false,
    pageNum: 1,
    filter: 'flows',
};


/**
 * Генерирует страницу ленты и создает обработчики событий
 */
export const FeedPage = async () => {
    feedState.pageNum = 1;

    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    const scrollButton = page.querySelector('.scroll-to-top');
    scrollButton?.addEventListener('click', toTop);

    window.addEventListener('scroll', debouncedFeedScroll);

    const delayedFill = new MutationObserver(async () => {
        const feed = document.querySelector<HTMLElement>('#feed');
        if (!feed) return;
        appState.masonryInstance = new Masonry(
            feed, {
                itemSelector: '.pin',
                columnWidth: appState.pinWidth,
                gutter: appState.mobile ? 10 : 20,
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

export const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    const scrollButton = document.querySelector('.scroll-to-top');
    scrollButton?.classList.toggle('hidden');
};
