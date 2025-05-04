import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { UserCard } from 'entities/UserCard';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { appState, navigate } from 'shared/router';
import { root } from 'app/app';
import { checkAvatar, pluralize } from 'shared/utils';
import SubscriptionsPageTemplate from './SubscriptionsPage.hbs';
import './SubscriptionsPage.scss';
import { Toast } from 'shared/components/Toast';

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
    const isSubscriptionsTab = tab === 'subscriptions';
    const own = Auth.userData?.username === username;

    try {
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
        
        const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
            navigate(`${username}/${tabId}`, true);
        });
        
        const tabBar = page.querySelector('.tab-bar-placeholder');
        tabBar?.replaceWith(newTabBar);

        const usersContainer = page.querySelector('.subscriptions__users');
        if (!usersContainer) return page;

        await loadUsers(isSubscriptionsTab, username, usersContainer);

        return page.firstChild as HTMLDivElement;
    } catch (error) {
        console.error('Error in SubscriptionsPage:', error);
        Toast('Произошла ошибка при загрузке страницы', 'error');
        page.innerHTML = '<div class="error-message">Не удалось загрузить данные</div>';
        return page;
    }
};

async function loadUsers(isSubscriptionsTab: boolean, username: string, container: Element) {
    try {
        let endpoint;
        const page = 1;
        const size = 20;
        
        if (Auth.userData?.username === username) {
            endpoint = isSubscriptionsTab 
                ? `/api/v1/profile/following?page=${page}&size=${size}`
                : `/api/v1/profile/followers?page=${page}&size=${size}`;
        } else {
            endpoint = isSubscriptionsTab 
                ? `/api/v1/users/${username}/following?page=${page}&size=${size}`
                : `/api/v1/users/${username}/followers?page=${page}&size=${size}`;  
        }
        
        const response = await API.get(endpoint);
        
        if (!(response instanceof Response)) {
            throw new Error('Failed to fetch users');
        }

        if (!response.ok) {
            if (response.status === 404) {
                showEmptyMessage(container, isSubscriptionsTab);
                return;
            } else if (response.status === 400) {
                Toast('Неверные параметры запроса', 'error');
                return;
            }
            throw new Error('Failed to fetch users');
        }

        const body = await response.json();
        const users: IUser[] = body.data || [];

        container.innerHTML = '';

        if (users.length === 0) {
            showEmptyMessage(container, isSubscriptionsTab);
            return;
        }

        for (const user of users) {
            const userCard = await createUserCard(user, username);
            container.appendChild(userCard);
        }

    } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<div class="error-message">Не удалось загрузить пользователей</div>';
    }
}

function showEmptyMessage(container: Element, isSubscriptionsTab: boolean) {
    container.innerHTML = `
        <div class="empty-message">
            ${isSubscriptionsTab 
                ? 'У вас пока нет подписок' 
                : 'У вас пока нет подписчиков'}
        </div>
    `;
}

async function createUserCard(user: IUser, currentUsername: string) {
    const avatarOk = user.avatar ? await checkAvatar(user.avatar) : false;
    
    let isSubscribed = false;
    if (Auth.userData) {
        const followingResponse = await API.get(`/api/v1/profile/following?page=1&size=20`);
        if (followingResponse instanceof Response && followingResponse.ok) {
            const followingData = await followingResponse.json();
            isSubscribed = followingData.data.some((followingUser: IUser) => followingUser.username === user.username);
        }
    }
    
    const userCard = UserCard({
        username: user.username,
        public_name: user.public_name,
        avatar: user.avatar,
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
            try {
                const subResponse = isSubscribed 
                    ? await API.delete('/api/v1/subscription', { target_user: user.username })
                    : await API.post('/api/v1/subscription', { target_user: user.username });

                if (!(subResponse instanceof Response) || !subResponse.ok) {
                    throw new Error('Subscription action failed');
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
            } catch (error) {
                console.error('Subscription error:', error);
                Toast('Не удалось выполнить действие', 'error');
            }
        });
    }

    const chatButton = userCard.querySelector('.user-card__chat-button');
    chatButton?.addEventListener('click', () => {
        navigate(`/messages/${user.username}`);
    });

    return userCard;
}