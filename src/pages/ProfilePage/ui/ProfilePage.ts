import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import type { IFeed } from 'pages/FeedPage';
import { handleTabBar } from '../handlers/tabBarHandler';
import { BoardPopup } from 'widgets/BoardPopup';
import { UserPins } from 'widgets/UserPins';
import { Auth } from 'features/authorization';
import { root } from 'app/app';
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';


export const ProfilePage = async (username: string): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const config = {
        header: username === Auth?.userData?.username ? 'Ваши flow' : username,
        username: username,
        shortUsername: username[0]?.toUpperCase(),
        own: Auth.userData ? username === Auth.userData.username : false,
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
