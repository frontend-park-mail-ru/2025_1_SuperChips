import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import type { IUser } from 'entities/User';
import { Masonry } from 'shared/models/Masonry';
import { UserCard } from 'entities/UserCard';
import { Toast } from 'shared/components/Toast';
import { checkAvatar } from 'shared/utils';
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
            ? `/profile/following?page=${subPageState.page}&size=${size}`
            : `/profile/followers?page=${subPageState.page}&size=${size}`;
    } else {
        endpoint = subPageState.isSubscriptionsTab
            ? `/users/${subPageState.username}/following?page=${subPageState.page}&size=${size}`
            : `/users/${subPageState.username}/followers?page=${subPageState.page}&size=${size}`;
    }

    const response = await API.get(endpoint);

    if (!(response instanceof Response)) {
        Toast('Не удалось загрузить пользователей', 'error');
        subPageState.container.innerHTML = '';
        removeScrollHandler();
        return;
    }

    if (!response.ok) {
        if (response.status === 404 && subPageState.page === 1) {
            showEmptyMessage(subPageState.container, subPageState.isSubscriptionsTab);
        } else if (response.status === 400) {
            Toast('Неверные параметры запроса', 'error');
        } else {
            Toast('Не удалось загрузить пользователей', 'error');
        }
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
        const followingResponse = await API.get('/profile/following?page=1&size=20');
        if (followingResponse instanceof Response && followingResponse.ok) {
            const followingData = await followingResponse.json();
            if (followingData.data) {
                isSubscribed = followingData.data.some((followingUser: IUser) => followingUser.username === user.username);
            }
        }
    }

    return UserCard({
        username: user.username,
        public_name: user.public_name,
        avatar: user.avatar && avatarOk ? user.avatar : null,
        about: user.about || '',
        subscriber_count: user.subscriber_count || 0,
        isSubscribed: isSubscribed,
        own: Auth.userData?.username === user.username
    });
}
