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
    
    // Проверяем, просматриваем ли мы свои подписки или подписки другого пользователя
    const own = Auth.userData ? username === Auth.userData.username : false;
    const isSubscriptionsTabActive = tab === 'subscriptions';
    
    // Получаем данные пользователя
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
    
    // Настраиваем страницу
    const config = {
        header: own ? 'Ваши подписки' : `Подписки ${userData?.public_name || username}`,
        username: username,
        own: own,
        isSubscribed: userData?.isSubscribed || false
    };
    
    page.innerHTML = SubscriptionsPageTemplate(config);
    
    // Создаем вкладки для переключения между подписками и подписчиками
    const tabs: ITabItem[] = [
        { id: 'subscriptions', title: 'Подписки', active: isSubscriptionsTabActive },
        { id: 'subscribers', title: 'Подписчики', active: !isSubscriptionsTabActive }
    ];
    
    const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
        navigate(`${username}/${tabId}`, true);
    });
    
    const tabBar = page.querySelector('.tab-bar-placeholder');
    tabBar?.replaceWith(newTabBar);
    
    // Заменяем недопустимые символы в username для использования в селекторе
    const safeUsername = username.replace(/[^a-zA-Z0-9_-]/g, '-');
    
    // Добавляем обработчик для кнопки подписки
    const subscribeButton = page.querySelector('#subscribe-' + safeUsername);
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            // ЗАГЛУШКА: Здесь будет логика подписки/отписки
            console.log('Subscribe button clicked for user:', username);
        });
    }
    
    // Загружаем начальных пользователей на основе активной вкладки
    const subscriptionsContainer = page.querySelector('.subscriptions__users');
    if (subscriptionsContainer) {
        // ЗАГЛУШКА: Моковые данные для демонстрации
        const mockUsers = isSubscriptionsTabActive ? [
            {
                username: 'Alexkir',
                public_name: 'Alexkir',
                avatar: '/public/img/pfp1.jpg',
                about: 'Достаточно длинное описание пользователя... Это описание достаточно длинное для того, чтобы занять несколько строк.',
                subscribers_count: 2,
                isSubscribed: true
            },
            {
                username: 'Alexey',
                public_name: 'Alexey',
                avatar: null,
                about: 'Не особо длинное описание',
                subscribers_count: 123,
                isSubscribed: true
            },
            {
                username: 'Alex_Meow',
                public_name: 'Alex Meow',
                avatar: null,
                about: 'I like to meow if meow it',
                subscribers_count: 5,
                isSubscribed: true
            },
            {
                username: 'Designer_Pro',
                public_name: 'Designer Pro',
                avatar: '/public/img/pfp2.jpg',
                about: 'Профессиональный дизайнер и фотограф',
                subscribers_count: 456,
                isSubscribed: true
            },
            {
                username: 'Photo_Master',
                public_name: 'Photo Master',
                avatar: '/public/img/pfp3.jpg',
                about: 'Люблю фотографировать природу и городские пейзажи',
                subscribers_count: 789,
                isSubscribed: true
            }
        ] : [
            {
                username: 'John_Doe',
                public_name: 'John Doe',
                avatar: null,
                about: 'Новый подписчик',
                subscribers_count: 1,
                isSubscribed: false
            },
            {
                username: 'Jane_Smith',
                public_name: 'Jane Smith',
                avatar: '/public/img/pfp2.jpg',
                about: 'Активный пользователь',
                subscribers_count: 45,
                isSubscribed: false
            },
            {
                username: 'Bob_Johnson',
                public_name: 'Bob Johnson',
                avatar: null,
                about: 'Любитель фотографий',
                subscribers_count: 78,
                isSubscribed: false
            },
            {
                username: 'Alice_Brown',
                public_name: 'Alice Brown',
                avatar: '/public/img/pfp3.jpg',
                about: 'Дизайнер и фотограф',
                subscribers_count: 234,
                isSubscribed: false
            },
            {
                username: 'Charlie_Wilson',
                public_name: 'Charlie Wilson',
                avatar: null,
                about: 'Фотограф-любитель',
                subscribers_count: 12,
                isSubscribed: false
            }
        ];
        
        // Очищаем контейнер
        subscriptionsContainer.innerHTML = '';
        
        // Добавляем карточки пользователей
        mockUsers.forEach(user => {
            const userCard = UserCard(user);
            subscriptionsContainer.appendChild(userCard);
        });
    }
    
    return page.firstChild as HTMLDivElement;
};

// Функция для загрузки пользователей (подписки или подписчики)
async function loadUsers(type: 'subscriptions' | 'subscribers', username: string, container: Element) {
    try {
        // ЗАГЛУШКА: В реальном приложении здесь будет запрос к API
        const endpoint = type === 'subscriptions' 
            ? `/api/v1/users/${username}/subscriptions`
            : `/api/v1/users/${username}/subscribers`;
            
        // ЗАГЛУШКА: Моковые данные для демонстрации
        const mockUsers = type === 'subscriptions' ? [
            {
                username: 'Alexkir',
                public_name: 'Alexkir',
                avatar: '/public/img/pfp1.jpg',
                about: 'Достаточно длинное описание пользователя... Это описание достаточно длинное для того, чтобы занять несколько строк.',
                subscribers_count: 2,
                isSubscribed: true // ЗАГЛУШКА: для демонстрации кнопки "Отписаться"
            },
            {
                username: 'Alexey',
                public_name: 'Alexey',
                avatar: null,
                about: 'Не особо длинное описание',
                subscribers_count: 123,
                isSubscribed: true
            },
            {
                username: 'Alex_Meow',
                public_name: 'Alex Meow',
                avatar: null,
                about: 'I like to meow if meow it',
                subscribers_count: 5,
                isSubscribed: true
            },
            {
                username: 'Designer_Pro',
                public_name: 'Designer Pro',
                avatar: '/public/img/pfp2.jpg',
                about: 'Профессиональный дизайнер и фотограф',
                subscribers_count: 456,
                isSubscribed: true
            },
            {
                username: 'Photo_Master',
                public_name: 'Photo Master',
                avatar: '/public/img/pfp3.jpg',
                about: 'Люблю фотографировать природу и городские пейзажи',
                subscribers_count: 789,
                isSubscribed: true
            }
        ] : [
            {
                username: 'John_Doe',
                public_name: 'John Doe',
                avatar: null,
                about: 'Новый подписчик',
                subscribers_count: 1,
                isSubscribed: false // ЗАГЛУШКА: для демонстрации кнопки "Подписаться"
            },
            {
                username: 'Jane_Smith',
                public_name: 'Jane Smith',
                avatar: '/public/img/pfp2.jpg',
                about: 'Активный пользователь',
                subscribers_count: 45,
                isSubscribed: false
            },
            {
                username: 'Bob_Johnson',
                public_name: 'Bob Johnson',
                avatar: null,
                about: 'Любитель фотографий',
                subscribers_count: 78,
                isSubscribed: false
            },
            {
                username: 'Alice_Brown',
                public_name: 'Alice Brown',
                avatar: '/public/img/pfp3.jpg',
                about: 'Дизайнер и фотограф',
                subscribers_count: 234,
                isSubscribed: false
            },
            {
                username: 'Charlie_Wilson',
                public_name: 'Charlie Wilson',
                avatar: null,
                about: 'Фотограф-любитель',
                subscribers_count: 12,
                isSubscribed: false
            }
        ];
        
        // Очищаем контейнер
        container.innerHTML = '';
        
        // Добавляем карточки пользователей
        mockUsers.forEach(user => {
            const userCard = UserCard(user);
            container.appendChild(userCard);
        });
        
    } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<div class="error-message">Не удалось загрузить пользователей</div>';
    }
}