import type { IUser } from 'entities/User';
import type { IPicture } from 'features/imageLoader';
import type { IPinProps } from 'entities/Pin';
import { Pin } from 'entities/Pin';
import type { FilterType } from 'shared/router';
import { appState } from 'shared/router';
import type { IBoardProps } from 'entities/Board';
import { Board } from 'entities/Board';
import type { IUserCardProps } from 'entities/UserCard';
import { UserCard } from 'entities/UserCard';
import { Masonry } from 'shared/models/Masonry';
import { Toast } from 'shared/components/Toast';
import { registerScrollHandler, removeScrollHandler } from 'features/scrollHandler';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';


export const fillSearchFeed = async () => {
    const feed = document.querySelector<HTMLElement>('#feed');
    if (!feed) return;

    appState.search.isFiltered = true;
    if (appState.search.page === 1) {
        window.scrollTo({ top: 0 });
        document.querySelector('.scroll-to-top')?.classList.add('hidden');
        registerScrollHandler(fillSearchFeed);
    }

    const URI = `/search/${appState.search.filter}?query=${appState.search.query}&page=${appState.search.page}&size=20`;
    const response = await API.get(URI);

    if (response instanceof Response && response.status === 404) {
        if (appState.search.page > 1) {
            Toast('По данному запросу больше ничего не найдено', 'message');
        }
        appState.search.notFound = true;
        removeScrollHandler();
        return;
    } else if (!(response instanceof Response && response.ok)) {
        removeScrollHandler();
        return;
    }

    if (appState.search.page === 1) {
        feed.innerHTML = '';
        const selectorMap: Record<FilterType, string> = {
            boards: '.board-container',
            flows: '.pin',
            users: '.user-card',
        };

        const filter = appState.search.filter;
        const itemSelector = selectorMap[filter];

        appState.masonryInstance?.destroy();
        appState.masonryInstance = new Masonry(feed, {
            itemSelector: itemSelector,
            gutter: appState.mobile ? 10 : 20,
        });
    }

    const body = await response.json();

    let followingResponse;
    let followingUsers: IUser[] = [];

    if (appState.search.filter === 'users') {
        followingResponse = await API.get('/profile/following?page=1&size=20');
        if (followingResponse instanceof Response && followingResponse.ok) {
            const followingData = await followingResponse.json();
            followingUsers = followingData.data;
        }
    }

    requestAnimationFrame(async () => {
        switch (appState.search.filter) {
        case 'flows':
            body.data.forEach((item: IPicture) => {
                const config: IPinProps = {
                    url: item.media_url,
                    pinID: item.flow_id,
                    width: item.width,
                    height: item.height,
                    is_nsfw: item.is_nsfw,
                };
                feed.appendChild(Pin(config));
                appState.search.loadedPins.push(config);
            });
            break;
        case 'boards':
            body.data.forEach((board: IBoardProps) => {
                feed.appendChild(Board(board));
                appState.search.loadedBoards.push(board);
            });
            break;
        case 'users':
            body.data.forEach((user: IUser) => {
                let isSubscribed = false;
                if (followingUsers) {
                    isSubscribed = followingUsers.some(followingUser => followingUser.username === user.username);
                }
                const userWithSubscription: IUserCardProps = {
                    username: user.username,
                    public_name: user.public_name,
                    avatar: user.avatar || null,
                    about: user.about || '',
                    subscriber_count: user.subscriber_count || 0,
                    isSubscribed: isSubscribed,
                    own: Auth.userData?.username === user.username
                };
                feed.appendChild(UserCard(userWithSubscription));
                appState.search.loadedUsers.push(userWithSubscription);
            });
            break;
        }

    });
    appState.search.page++;
};
