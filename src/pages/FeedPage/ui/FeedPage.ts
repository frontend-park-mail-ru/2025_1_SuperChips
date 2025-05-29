import { IPinProps, Pin } from 'entities/Pin';
import { Masonry } from 'shared/models/Masonry';
import { fillFeed } from '../lib/fillFeed';
import { registerScrollHandler } from 'features/scrollHandler';
import { appState } from 'shared/router';
import { fillSearchFeed } from '../lib/fillSearchFeed';
import feedTemplate from './FeedPage.hbs';
import './feed.scss';
import { restoreSearchFeed } from '../lib/restoreSearchFeed';


interface IFeedState {
    isLoading: boolean,
    pageNum: number,
    filter: string,
    loadedPins: IPinProps[],
    lastScroll: number,
}

export const feedState: IFeedState = {
    isLoading: false,
    pageNum: 1,
    filter: 'flows',
    loadedPins: [],
    lastScroll: 0,
};


/**
 * Генерирует страницу ленты и создает обработчики событий
 */
export const FeedPage = async () => {
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

        if (appState.search.isFiltered) {
            restoreSearchFeed();
            return;
        }

        if (feedState.loadedPins.length > 0 && !appState.search.query) {
            feedState.loadedPins.forEach((item) => {
                feed.appendChild(Pin(item));
            });

            registerScrollHandler(fillFeed);

            setTimeout(() => {
                window.scrollTo({ top: appState.lastScroll });
            }, 0);

            return;
        }

        if (appState.search.query === '') {
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
