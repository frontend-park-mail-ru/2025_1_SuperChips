import type { IFeed } from '../ui/FeedPage';
import type { IUser } from 'entities/User';
import type { IPicture } from 'features/imageLoader';
import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import { Masonry } from 'shared/models/Masonry';
import { Toast } from 'shared/components/Toast';
import { searchFeedScroll } from '../handlers/handleScroll';
import { UserCard } from 'entities/UserCard';
import { API } from 'shared/api';


export const searchFeedState = {
    page: 1,
    query: '',
    filter: 'flows',
};


export const fillSearchFeed = async () => {
    const feed = document.querySelector<IFeed>('#feed');
    if (!feed) return;

    const URI = `/api/v1/search/${searchFeedState.filter}?query=${searchFeedState.query}&page=${searchFeedState.page}&size=20`;
    const response = await API.get(URI);

    if (response instanceof Response && response.status === 404) {
        Toast('По данному запросу ничего не найдено', 'message');
        window.removeEventListener('scroll', searchFeedScroll);
        return;
    } else if (!(response instanceof Response && response.ok)) {
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
            feed.masonry = new Masonry(feed, { itemSelector: '.pin', columnWidth: 210 });
        } else if (searchFeedState.filter === 'users') {
            feed.masonry?.destroy();
            feed.masonry = new Masonry(feed, { itemSelector: '.user-card', columnWidth: 460 });
            console.log(feed.masonry);
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
        body.data.forEach((user: IUser) => {
            feed.appendChild(UserCard(user));
        });
        break;
    }

    searchFeedState.page++;
};
