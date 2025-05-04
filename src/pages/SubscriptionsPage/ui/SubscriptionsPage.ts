import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { Masonry } from 'shared/models/Masonry';
import { UserCard } from 'entities/UserCard';
import { Toast } from 'shared/components/Toast';
import { checkAvatar, pluralize } from 'shared/utils';
import { registerScrollHandler, removeScrollHandler } from 'features/scrollHandler';
import { appState, navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import SubscriptionsPageTemplate from './SubscriptionsPage.hbs';
import './SubscriptionsPage.scss';


export const subPageState = {
    page: 1,
    username: '',
    container: document.createElement('div'),
    isSubscriptionsTab: false,
};


interface IUser {
    username: string;
    public_name: string;
    avatar: string | null;
    isSubscribed: boolean;
    about?: string;
    subscribers_count?: number;
}


export const SubscriptionsPage = async (username: string, tab: string = 'subscriptions'): Promise<HTMLDivElement> => {
    const page = document.createElement('div');
    const own = Auth.userData?.username === username;
    const isSubscriptionsTab = tab === 'subscriptions' && own;

    const config = {
        header: isSubscriptionsTab ? 'Подписки' : 'Подписчики',
        username: username,
        own: own,
        tab: tab
    };
    page.innerHTML = SubscriptionsPageTemplate(config);

    const tabs: ITabItem[] = [
        { id: 'subscriptions', title: 'Подписки', active: isSubscriptionsTab },
        { id: 'subscribers', title: 'Подписчики', active: !isSubscriptionsTab }
    ];

    if (own) {
        const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
            navigate(`${username}/${tabId}`, true);
        });
        const tabBar = page.querySelector('.tab-bar-placeholder');
        tabBar?.replaceWith(newTabBar);
    }

    const usersContainer = page.querySelector<HTMLDivElement>('.subscriptions__users');
    if (!usersContainer) return page;

    subPageState.page = 1;
    subPageState.username = username;
    subPageState.container = usersContainer;
    subPageState.isSubscriptionsTab = isSubscriptionsTab;

    requestAnimationFrame(async () => {
        appState.masonryInstance = new Masonry(
            usersContainer,
            {
                itemSelector: '.user-card',
                gutter: appState.mobile ? 10 : 20,
            }
        );
        await loadUsers();
        registerScrollHandler(loadUsers);
    });

    return page.firstChild as HTMLDivElement;
};


async function loadUsers() {
    let endpoint;
    const size = 20;

    if (Auth.userData?.username === subPageState.username) {
        endpoint = subPageState.isSubscriptionsTab
            ? `/api/v1/profile/following?page=${subPageState.page}&size=${size}`
            : `/api/v1/profile/followers?page=${subPageState.page}&size=${size}`;
    } else {
        endpoint = subPageState.isSubscriptionsTab
            ? `/api/v1/users/${subPageState.username}/following?page=${subPageState.page}&size=${size}`
            : `/api/v1/users/${subPageState.username}/followers?page=${subPageState.page}&size=${size}`;
    }

    const response = await API.get(endpoint);

    if (!(response instanceof Response)) {
        subPageState.container.innerHTML = '<div class="error-message">Не удалось загрузить пользователей</div>';
        removeScrollHandler();
        return;
    }

    if (!response.ok) {
        if (response.status === 404 && subPageState.page === 1) {
            showEmptyMessage(subPageState.container, subPageState.isSubscriptionsTab);
            removeScrollHandler();
            return;
        } else if (response.status === 400) {
            Toast('Неверные параметры запроса', 'error');
            removeScrollHandler();
            return;
        }
        subPageState.container.innerHTML = '<div class="error-message">Не удалось загрузить пользователей</div>';
        removeScrollHandler();
        return;
    }

    const body = await response.json();
    const users: IUser[] = body.data || [];

    if (users.length === 0 && subPageState.page === 1) {
        showEmptyMessage(subPageState.container, subPageState.isSubscriptionsTab);
        removeScrollHandler();
        return;
    }

    for (const user of users) {
        const userCard = await createUserCard(user);
        subPageState.container.appendChild(userCard);
    }
    subPageState.page++;
}

function showEmptyMessage(container: Element, isSubscriptionsTab: boolean, own: boolean = false) {
    const message = !own ? 'У пользователя нет подписчиков'
        : isSubscriptionsTab
            ? 'У вас пока нет подписок'
            : 'У вас пока нет подписчиков';
    container.innerHTML = `
        <div class="empty-message">
            ${message}
        </div>
    `;
}

async function createUserCard(user: IUser) {
    const avatarOk = user.avatar ? await checkAvatar(user.avatar) : false;
    
    let isSubscribed = false;
    if (Auth.userData) {
        const followingResponse = await API.get('/api/v1/profile/following?page=1&size=20');
        if (followingResponse instanceof Response && followingResponse.ok) {
            const followingData = await followingResponse.json();
            isSubscribed = followingData.data.some((followingUser: IUser) => followingUser.username === user.username);
        }
    }

    const userCard = UserCard({
        username: user.username,
        public_name: user.public_name,
        avatar: avatarOk ? user.avatar : null,
        about: user.about || '',
        subscribers_count: user.subscribers_count || 0,
        isSubscribed: isSubscribed,
        own: Auth.userData?.username === user.username
    });
    
    const avatar = userCard.querySelector('.user-card__avatar');
    avatar?.addEventListener('click', () => {
        navigate(`${user.username}`);
    });
    
    const subscribeButton = userCard.querySelector('.user-card__subscribe-button');
    if (subscribeButton && Auth.userData?.username !== user.username) {
        subscribeButton.addEventListener('click', async () => {
            const subResponse = isSubscribed
                ? await API.delete('/api/v1/subscription', { target_user: user.username })
                : await API.post('/api/v1/subscription', { target_user: user.username });

            if (!(subResponse instanceof Response) || !subResponse.ok) {
                Toast('Не удалось выполнить действие', 'error');
                return;
            }

            isSubscribed = !isSubscribed;
            subscribeButton.textContent = isSubscribed ? 'Отписаться' : 'Подписаться';
            subscribeButton.classList.toggle('subscribed', isSubscribed);

            const subscribersElement = userCard.querySelector(`#${user.username}-subscribers`);
            if (subscribersElement) {
                const newCount = (user.subscribers_count || 0) + (isSubscribed ? 1 : -1);
                user.subscribers_count = newCount;
                subscribersElement.textContent = pluralize('подписчик', newCount);
            }

            Toast(
                isSubscribed
                    ? `Вы подписались на ${user.public_name}`
                    : `Вы отписались от ${user.public_name}`,
                'success'
            );
        });
    }

    const chatButton = userCard.querySelector('.user-card__chat-button');
    chatButton?.addEventListener('click', () => {
        navigate(`/messages/${user.username}`);
    });

    return userCard;
}
