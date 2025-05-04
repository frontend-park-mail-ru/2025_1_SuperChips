import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import type { IFeed } from 'pages/FeedPage';
import { checkAvatar } from 'shared/utils';
import { profileTabBarHandler } from '../handlers/tabBarHandler';
import { BoardPopup } from 'widgets/BoardPopup';
import { UserPins } from 'widgets/UserPins';
import { UserBoards } from 'widgets/UserBoard';
import { Auth } from 'features/authorization';
import { root } from 'app/app';
import { API } from 'shared/api';
import { appState, navigate } from 'shared/router';
import { Toast } from 'shared/components/Toast';
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';

interface IUserData {
    username: string;
    public_name: string;
    avatar: string | null;
    about?: string;
    followersCount?: number;
    isSubscribed?: boolean;
}

export const ProfilePage = async (username: string, tab: string = 'pins'): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const own = Auth.userData ? username === Auth.userData.username : false;
    const isPinTabActive = tab === 'pins';
    let userData: IUserData | undefined;

    const isLastVisited = (
        ['profile', 'profilePins', 'profileBoards', null].includes(appState.lastPage)
        && username === appState.lastVisited?.username
    );

    try {
        if (own) {
            userData = Auth.userData as IUserData;
        } else if (!isLastVisited) {
            const response = await API.get(`/api/v1/users/${username}`);
            if (!(response instanceof Response && response.ok)) {
                console.error('Failed to fetch user data');
                return page;
            }
            
            const body = await response.json();
            userData = body.data as IUserData;
            appState.lastVisited = body.data;
        } else {
            userData = appState.lastVisited as IUserData;
        }

        if (!userData) {
            console.error('No user data available');
            return page;
        }

        let isSubscribed = false;
        if (Auth.userData && !own) {
            const followingResponse = await API.get(`/api/v1/profile/following?page=1&size=20`);
            if (followingResponse instanceof Response && followingResponse.ok) {
                const followingData = await followingResponse.json();
                if (followingData.data){
                    isSubscribed = followingData.data.some((followingUser: IUserData) => followingUser.username === username);
                }
            }
        }

        const ok = await checkAvatar(userData.avatar || undefined);
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
            userData: {
                ...userData,
                followersCount: userData.followersCount || 0
            }
        };

        page.innerHTML = ProfilePageTemplate(config);

        const tabs: ITabItem[] = [
            { id: 'flows', title: 'Flow', active: isPinTabActive },
            { id: 'boards', title: 'Доски', active: !isPinTabActive }
        ];

        const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
            navigate(`${username}/${tabId}`, true);
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
                try {
                    const subResponse = isSubscribed 
                        ? await API.delete('/api/v1/subscription', { target_user: username })
                        : await API.post('/api/v1/subscription', { target_user: username });
                    
                    if (!(subResponse instanceof Response) || !subResponse.ok) {
                        throw new Error('Subscription action failed');
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
                } catch (error) {
                    console.error('Error toggling subscription:', error);
                    Toast('Не удалось выполнить действие', 'error');
                }
            });
        }

        const feed = page.querySelector<IFeed>('.profile__feed');
        if (feed) {
            const delayedFill: MutationObserver = new MutationObserver(async () => {
                try {
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
                } catch (error) {
                    console.error('Error loading content:', error);
                    feed.innerHTML = '<div class="error-message">Не удалось загрузить контент</div>';
                }
                delayedFill.disconnect();
            });

            delayedFill.observe(root, { childList: true });
        }

        return page.firstChild as HTMLDivElement;
    } catch (error) {
        console.error('Error in ProfilePage:', error);
        page.innerHTML = '<div class="error-message">Произошла ошибка при загрузке профиля</div>';
        return page;
    }
};
