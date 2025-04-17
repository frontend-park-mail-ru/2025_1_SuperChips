import type { IFeed } from 'pages/FeedPage';
import { boardFeedScroll } from 'pages/BoardPage';
import { UserPins } from 'widgets/UserPins';
import { UserBoards } from 'widgets/UserBoard';
import { appState } from 'shared/router';


const profilePageState = {
    currentTab: 'pin',
};

export const profileTabBarHandler = async (tabId: string, username: string) => {
    const content = document.querySelector<IFeed>('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins' && profilePageState.currentTab !== 'pins') {
        content.innerHTML = '';
        await UserPins(username);
        newBoard?.classList.add('hidden');
        appState.activeTab = 'pins';
    } else if (tabId === 'boards' && profilePageState.currentTab !== 'boards') {
        window.removeEventListener('scroll', boardFeedScroll);
        if (content.masonry) {
            content.masonry = null;
        }
        content.innerHTML = '';
        await UserBoards(username);
        newBoard?.classList.remove('hidden');
        appState.activeTab = 'boards';
    }
};
