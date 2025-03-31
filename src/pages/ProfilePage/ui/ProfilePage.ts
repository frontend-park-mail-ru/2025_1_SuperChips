import type { ITabItem } from 'shared/components/tabBar';
import { TabBar } from 'shared/components/tabBar';
import { Auth } from 'features/authorization';
import { UserPins } from 'widgets/UserPins';
import { UserBoard } from 'widgets/UserBoard';
// import { BoardPopup } from 'entities/Board';
import ProfilePageTemplate from './ProfilePage.hbs';
import './ProfilePage.scss';


const pageState = {
    currentTab: 'pin',
};

export const ProfilePage = async (username: string): Promise<HTMLDivElement> => {
    const page = document.createElement('div');

    const config = {
        header: username,
        shortUsername: username[0].toUpperCase(),
        own: Auth.userData ? username === Auth.userData.username : false,
    };

    page.innerHTML = ProfilePageTemplate(config);

    const tabs: ITabItem[] = [
        { id: 'pins', title: 'Flow', active: true },
        { id: 'boards', title: 'Доски', active: false }
    ];



    const newTabBar = TabBar(tabs, 'horizontal' , async (tabId) => {
        const content = document.querySelector('#content');
        if (!content) return;
        let newContent: null | HTMLDivElement = null;

        const newBoard = document.querySelector('.create-board');

        if (tabId === 'pins' && pageState.currentTab !== 'pins') {
            newContent = await UserPins(username);
            newBoard?.classList.add('hidden');
        } else if (tabId === 'boards' && pageState.currentTab !== 'boards') {
            newContent = await UserBoard(username);
            newBoard?.classList.remove('hidden');
        }

        if (newContent) {
            content.innerHTML = '';
            content.appendChild(newContent);
        }
    });

    const tabBar = page.querySelector('.tab-bar-placeholder');
    tabBar?.replaceWith(newTabBar);

    const newBoard = page.querySelector('.create-board');
    newBoard?.addEventListener('click', createNewBoard);

    const content = page.querySelector('#content');
    content?.appendChild(await UserPins(username));

    return page.firstElementChild as HTMLDivElement;
};

const createNewBoard = () => {
    // BoardPopup('edit');

    // логика для добавления доски по ручке
};
