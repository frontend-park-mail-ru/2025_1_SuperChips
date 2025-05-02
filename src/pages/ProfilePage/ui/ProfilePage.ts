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
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';


export const ProfilePage = async (username: string, tab: string): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const own = Auth.userData ? username === Auth.userData.username : false;
    const isPinTabActive = tab === 'pins';
    let userData;

    const isLastVisited = (
        ['profile', 'profilePins', 'profileBoards', null].includes(appState.lastPage)
        && username === appState.lastVisited.username
    );

    if (own) {
        userData = Auth.userData;
    } else if (!isLastVisited) {
        const response = await API.get(`/api/v1/users/${username}`);
        if (!(response instanceof Response && response.ok)) return page;

        const body = await response.json();
        userData = body.data;
        appState.lastVisited = body.data;
    } else {
        userData = appState.lastVisited;
    }

    const ok = await checkAvatar(userData.avatar);
    const config = {
        header: own ? 'Ваши flow' : userData.public_name,
        username: username,
        shortUsername: username[0]?.toUpperCase(),
        author_pfp: ok ? userData.avatar : null,
        own: own,
        showCreateBoardButton: !isPinTabActive && own,
        userBio: userData.about || null,
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
    
    // Add event listener for subscriptions button
    const subscriptionsButton = page.querySelector('#subscriptions-button');
    subscriptionsButton?.addEventListener('click', () => {
        navigate(`${username}/subscriptions`);
    });

    const feed = page.querySelector<IFeed>('.profile__feed');
    if (!feed) return page;


    const delayedFill: MutationObserver = new MutationObserver(async () => {
        if (isPinTabActive) {
            await UserPins(username);
        } else {
            await UserBoards(username);
        }
        delayedFill.disconnect();
    });

    delayedFill.observe(root, { childList: true });

    return page.firstChild as HTMLDivElement;
};
