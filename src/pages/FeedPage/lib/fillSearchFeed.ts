import type { IFeed } from '../ui/FeedPage';
import type { IPicture } from 'features/imageLoader';
import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { Masonry } from 'shared/models/Masonry';
import { searchFeedScroll } from '../handlers/handleScroll';
import { API } from 'shared/api';


export const searchFeedState = {
    page: 1,
    query: '',
    filter: '',
};


export const fillSearchFeed = async () => {
    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    const URI = `/api/v1/search/${searchFeedState.filter}?query=${searchFeedState.query}&page=${searchFeedState.page}&size=20`;
    const response = await API.get(URI);

    if (!(response instanceof Response && response.ok)) {
        window.removeEventListener('scroll', searchFeedScroll);
        return;
    }

    if (searchFeedState.page === 1) {
        feed.innerHTML = '';

        if (searchFeedState.filter === 'boards') {
            feed?.masonry?.destroy();
            feed.masonry = new Masonry(feed, { itemSelector: '.board-container', columnWidth: 362 });
        } else if (searchFeedState.filter === 'flows') {
            feed.masonry?.destroy();
            feed.masonry = new Masonry(feed, { itemSelector: '.pin', columnWidth: 206 });
        }
    }

    const body = await response.json();

    switch (searchFeedState.filter) {
    case 'flows':
        body.data.forEach((item: IPicture) => {
            const config: IPinProps = {
                url: item.media_url,
                pinID: item.flow_id,
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
        // TODO добавить, когда будет правильно работать на бэкенде
        break;
    }

    searchFeedState.page++;
};
