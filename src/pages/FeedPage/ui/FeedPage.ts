import { Masonry } from 'shared/models/Masonry';
import { fillFeed } from '../lib/fillFeed';
import { registerScrollHandler } from 'features/scrollHandler';
import { appState } from 'shared/router';
import { fillSearchFeed, searchFeedState } from '../lib/fillSearchFeed';
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


    setTimeout(async () => {
        const feed = document.querySelector<HTMLElement>('#feed');
        if (!feed) return;

        appState.masonryInstance = new Masonry(
            feed, {
                itemSelector: '.pin',
                gutter: appState.mobile ? 10 : 20,
            }
        );

        if (searchFeedState.query === '') {
            registerScrollHandler(fillFeed);
            await fillFeed();
            await fillFeed();
        } else {
            registerScrollHandler(fillSearchFeed);
            await fillSearchFeed();
        }
    }, 0);

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
