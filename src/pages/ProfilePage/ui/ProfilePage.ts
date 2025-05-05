import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { checkAvatar } from 'shared/utils';
import { profileTabBarHandler } from '../handlers/tabBarHandler';
import { BoardPopup } from 'widgets/BoardPopup';
import { UserPins } from 'widgets/UserPins';
import { UserBoards } from 'widgets/UserBoard';
import { Toast } from 'shared/components/Toast';
import { Chat } from 'widgets/Chat';
import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { appState, navigate } from 'shared/router';
import { ChatStorage } from 'features/chat';
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';


interface IUserData {
    username: string;
    public_name: string;
    avatar: string | null;
    about?: string;
    followersCount?: number;
    subscriber_count?: number;
    subscribers_count?: number;
    isSubscribed?: boolean;
}


export const ProfilePage = async (username: string, tab: string = 'pins'): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const own = Auth.userData ? username === Auth.userData.username : false;
    const isPinTabActive = tab === 'pins';
    let userData: IUserData | undefined;

    const isLastVisited = (
        !!appState.lastPage &&
        ['profile', 'profilePins', 'profileBoards'].includes(appState.lastPage)
        && username === appState.lastVisited.username
    );

    if (own) {
        userData = Auth.userData as IUserData;
    } else if (!isLastVisited) {
        const response = await API.get(`/users/${username}`);
        if (!(response instanceof Response && response.ok)) {
            Toast('Ошибка при получении данных');
            return page;
        }

        const body = await response.json();
        userData = body.data as IUserData;
        appState.lastVisited = body.data;
    } else {
        userData = appState.lastVisited as IUserData;
    }

    if (!userData) {
        Toast('Ошибка при получении данных');
        return page;
    }

    let isSubscribed = false;
    if (Auth.userData && !own) {
        const followingResponse = await API.get('/profile/following?page=1&size=20');
        if (followingResponse instanceof Response && followingResponse.ok) {
            const followingData = await followingResponse.json();
            if (followingData.data) {
                isSubscribed = followingData.data.some((followingUser: IUserData) => followingUser.username === username);
            }
        }
    }

    const ok = await checkAvatar(userData.avatar || undefined);
    // Use subscriber_count if available, otherwise use subscribers_count or fallback to followersCount or 0
    const subscriberCount = userData.subscriber_count !== undefined ? userData.subscriber_count :
        (userData.subscribers_count !== undefined ? userData.subscribers_count :
            (userData.followersCount || 0));
    
    const config = {
        header: own ? 'Ваши flow' : userData.public_name,
        username: username,
        shortUsername: username[0]?.toUpperCase(),
        author_pfp: ok ? userData.avatar : null,
        own: own,
        showCreateBoardButton: !isPinTabActive && own,
        userBio: userData.about || null,
        isSubscribed: isSubscribed,
        safeUsername: username.replace(/[^a-zA-Z0-9_-]/g, '-'),
        mobile: appState.mobile,
        userData: {
            ...userData,
            followersCount: subscriberCount
        }
    };

    page.innerHTML = ProfilePageTemplate(config);

    const tabs: ITabItem[] = [
        { id: 'pins', title: 'Flow', active: isPinTabActive },
        { id: 'boards', title: 'Доски', active: !isPinTabActive }
    ];

    const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
        profileTabBarHandler(tabId, username);
    });
    const tabBar = page.querySelector('.tab-bar-placeholder');
    tabBar?.replaceWith(newTabBar);

    const newBoard = page.querySelector('.create-board');
    newBoard?.addEventListener('click', () => BoardPopup('create'));

    const subscriptionsButton = page.querySelector('#subscriptions-button');
    subscriptionsButton?.addEventListener('click', () => {
        navigate(`${username}/subscriptions`);
    });


    const subscribeButton = page.querySelector(`#subscribe-${config.safeUsername}`);
    if (subscribeButton) {
        subscribeButton.addEventListener('click', async () => {
            const subResponse = isSubscribed
                ? await API.delete('/subscription', { target_user: username })
                : await API.post('/subscription', { target_user: username });

            if (!(subResponse instanceof Response) || !subResponse.ok) {
                Toast('Ошибка при получении данных');
                page.innerHTML = '';
                return page;
            }

            isSubscribed = !isSubscribed;
            subscribeButton.textContent = isSubscribed ? 'Отписаться' : 'Подписаться';
            subscribeButton.classList.toggle('subscribed', isSubscribed);

            Toast(
                isSubscribed
                    ? `Вы подписались на ${userData.public_name || username}`
                    : `Вы отписались от ${userData.public_name || username}`,
                'success'
            );
        });
    }

    const feed = page.querySelector('.profile__feed');
    if (feed) {
        requestAnimationFrame(async () => {
            if (isPinTabActive) {
                if (userData?.about) {
                    const description = document.createElement('div');
                    description.classList.add('pin', 'description-pin');
                    description.innerHTML = `
                                <div class="description-content">
                                    <p>${userData.about}</p>
                                </div>
                            `;
                    feed.appendChild(description);
                }
                await UserPins(username);
            } else {
                await UserBoards(username);
            }
        });
    }

    const messageButton = page.querySelector('.author__chat-button');
    messageButton?.addEventListener('click', async () => {
        let chatID;
        const chat = ChatStorage.getChatByUsername(username);

        if (appState.chat.id === chat?.id) return;
        if (!chat) {
            await ChatStorage.newContact(username);
            const newChatID = await ChatStorage.newChat(username);
            if (!newChatID) return;
            chatID = newChatID.toString();
        } else {
            chatID = chat.id.toString();
        }

        Chat(chatID).finally();
    });

    return page.firstChild as HTMLDivElement;
};
