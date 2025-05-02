import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { UserCard } from 'entities/UserCard';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { appState, navigate } from 'shared/router';
import { root } from 'app/app';
import SubscriptionsPageTemplate from './SubscriptionsPage.hbs';
import './SubscriptionsPage.scss';

export const SubscriptionsPage = async (username: string, tab: string = 'subscriptions'): Promise<HTMLDivElement> => {
    const page = document.createElement('div');
    
    const own = Auth.userData ? username === Auth.userData.username : false;
    const isSubscriptionsTabActive = tab === 'subscriptions';
    
    let userData;
    const isLastVisited = (
        ['subscriptions', 'subscribers', null].includes(appState.lastPage)
        && username === appState.lastVisited?.username
    );

    if (own) {
        userData = Auth.userData;
    } else if (!isLastVisited) {
        try {
            const response = await API.get(`/api/v1/users/${username}`);
            if (!(response instanceof Response && response.ok)) {
                console.error('Failed to fetch user data');
                return page;
            }
            
            const body = await response.json();
            userData = body.data;
            appState.lastVisited = body.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return page;
        }
    } else {
        userData = appState.lastVisited;
    }
    
    const config = {
        header: own ? 'Ваши подписки' : `Подписки ${userData?.public_name || username}`,
        username: username,
        own: own,
        isSubscribed: userData?.isSubscribed || false
    };
    
    page.innerHTML = SubscriptionsPageTemplate(config);
    
    const tabs: ITabItem[] = [
        { id: 'subscriptions', title: 'Подписки', active: isSubscriptionsTabActive },
        { id: 'subscribers', title: 'Подписчики', active: !isSubscriptionsTabActive }
    ];
    
    const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
        navigate(`${username}/${tabId}`, true);
    });
    
    const tabBar = page.querySelector('.tab-bar-placeholder');
    tabBar?.replaceWith(newTabBar);
    
    const subscriptionsContainer = page.querySelector('.subscriptions__users');
    if (subscriptionsContainer) {
        await loadUsers(isSubscriptionsTabActive ? 'subscriptions' : 'subscribers', username, subscriptionsContainer);
    }
    
    return page.firstChild as HTMLDivElement;
};

async function loadUsers(type: 'subscriptions' | 'subscribers', username: string, container: Element) {
    try {
        const endpoint = type === 'subscriptions' 
            ? `/api/v1/users/${username}/subscriptions`
            : `/api/v1/users/${username}/subscribers`;
            
        // Минимальный набор моковых данных для демонстрации
        const mockUsers = [
            {
                username: 'user1',
                public_name: 'valekir',
                avatar: null,
                about: 'Длинное описание профиля очень длинное описание профиля такое что ему нужно занять несколько строк, несколько строк и еще побольше',
                isSubscribed: type === 'subscriptions'
            },
            {
                username: 'user2',
                public_name: 'emresha',
                avatar: null,
                about: 'just an average flow user',
                subscribers_count: 20,
                isSubscribed: type === 'subscriptions'
            },
            {
                username: 'user2',
                public_name: 'самый мощный мотиватор планеты',
                avatar: null,
                about: 'берем сначала зайца...',
                subscribers_count: 100000000000,
                isSubscribed: type === 'subscriptions'
            },
            {
                username: 'user2',
                public_name: 'darkwingduck',
                avatar: null,
                about: 'purple hat lover',
                subscribers_count: 35,
                isSubscribed: type === 'subscriptions'
            },
            {
                username: 'user2',
                public_name: 'User meow',
                avatar: null,
                about: 'i like to meow it meow it',
                subscribers_count: 20,
                isSubscribed: type === 'subscriptions'
            },
            {
                username: 'user3',
                public_name: 'скебоб',
                avatar: null,
                about: 'лол',
                subscribers_count: 30,
                isSubscribed: type === 'subscriptions'
            }
        ];
        
        container.innerHTML = '';
        
        mockUsers.forEach(user => {
            const userCard = UserCard(user);
            container.appendChild(userCard);
        });
        
    } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<div class="error-message">Не удалось загрузить пользователей</div>';
    }
}