import type { ITabItem } from 'shared/components/tabBar';
import type { IFeed } from 'pages/FeedPage';
import { TabBar } from 'shared/components/tabBar';
import { checkAvatar } from 'shared/utils';
import { handleTabBar } from '../handlers/tabBarHandler';
import { BoardPopup } from 'widgets/BoardPopup';
import { UserPins } from 'widgets/UserPins';
import { Auth } from 'features/authorization';
import { root } from 'app/app';
import { API } from 'shared/api';
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';


export const ProfilePage = async (username: string): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const own = Auth.userData ? username === Auth.userData.username : false;
    let userData;

    if (own) {
        userData = Auth.userData;
    } else {
        const response = await API.get(`/api/v1/users/${username}`);
        if (!(response instanceof Response && response.ok)) return page;

        const body = await response.json();
        userData = body.data;
    }

    const ok = await checkAvatar(userData.avatar);
    const config = {
        header: own ? 'Ваши flow' : userData.public_name,
        username: username,
        shortUsername: username[0]?.toUpperCase(),
        author_pfp: ok ? userData.avatar : null,
        own: own,
    };

    page.innerHTML = ProfilePageTemplate(config);

    const tabs: ITabItem[] = [
        { id: 'pins', title: 'Flow', active: true },
        { id: 'boards', title: 'Доски', active: false }
    ];

    const newTabBar = TabBar(tabs, 'horizontal', (tabId) => {
        handleTabBar(tabId, username);
    });
    const tabBar = page.querySelector('.tab-bar-placeholder');
    tabBar?.replaceWith(newTabBar);

    const newBoard = page.querySelector('.create-board');
    newBoard?.addEventListener('click', () => BoardPopup('create'));

    const feed = page.querySelector<IFeed>('.profile__feed');
    if (!feed) return page;

    const delayedFill: MutationObserver = new MutationObserver(async () => {
        await UserPins(username);
        delayedFill.disconnect();
    });

    delayedFill.observe(root, { childList: true });

    return page.firstChild as HTMLDivElement;
};
