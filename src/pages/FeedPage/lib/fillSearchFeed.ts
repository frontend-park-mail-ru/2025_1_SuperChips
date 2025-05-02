import type { IUser } from 'entities/User';
import type { IPicture } from 'features/imageLoader';
import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { Masonry } from 'shared/models/Masonry';
import { Toast } from 'shared/components/Toast';
import { UserCard } from 'entities/UserCard';
import { registerScrollHandler, removeScrollHandler } from 'features/scrollHandler';
import { API } from 'shared/api';
import { appState } from 'shared/router';

type FilterType = 'boards' | 'flows' | 'users';


export const searchFeedState = {
    page: 1,
    query: '',
    filter: 'flows',
    notFound: false,
};


export const fillSearchFeed = async () => {
    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    if (searchFeedState.page === 1) {
        window.scrollTo({ top: 0 });
        document.querySelector('.scroll-to-top')?.classList.add('hidden');
        registerScrollHandler(fillSearchFeed);
    }

    const URI = `/api/v1/search/${searchFeedState.filter}?query=${searchFeedState.query}&page=${searchFeedState.page}&size=20`;
    const response = await API.get(URI);


    if (response instanceof Response && response.status === 404) {
        if (searchFeedState.page > 1) {
            Toast('По данному запросу больше ничего не найдено', 'message');
        }
        removeScrollHandler();
        return;
    } else if (!(response instanceof Response && response.ok)) {
        removeScrollHandler();
        return;
    }

    if (searchFeedState.page === 1) {
        feed.innerHTML = '';
        const selectorMap: Record<FilterType, string> = {
            boards: '.board-container',
            flows: '.pin',
            users: '.user-card',
        };

        const filter = searchFeedState.filter as FilterType;
        const itemSelector = selectorMap[filter];

        appState.masonryInstance?.destroy();
        appState.masonryInstance = new Masonry(feed, {
            itemSelector: itemSelector,
            gutter: appState.mobile ? 10 : 20,
        });
    }

    const body = await response.json();
    requestAnimationFrame(() => {
        switch (searchFeedState.filter) {
        case 'flows':
            body.data.forEach((item: IPicture) => {
                const config: IPinProps = {
                    url: item.media_url,
                    pinID: item.flow_id,
                    width: item.width,
                    height: item.height,
                };
                feed.appendChild(Pin(config));
            });
            break;
        case 'boards':
            body.data.forEach((board: IBoardProps) => {
                feed.appendChild(Board(board));
            });
            break;
        case 'users':
            body.data.forEach((user: IUser) => {
                feed.appendChild(UserCard(user));
            });
            break;
        }

    });
    searchFeedState.page++;
};
