import type { IFeed } from 'pages/FeedPage';
import { boardFeedScroll } from 'pages/BoardPage';
import { UserPins } from 'widgets/UserPins';
import { UserBoard } from 'widgets/UserBoard';


const profilePageState = {
    currentTab: 'pin',
};

export const handleTabBar = async (tabId: string, username: string) => {
    const content = document.querySelector<IFeed>('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins' && profilePageState.currentTab !== 'pins') {
        content.innerHTML = '';
        await UserPins(username);
        newBoard?.classList.add('hidden');
        history.state.lastTab = 'pins';
    } else if (tabId === 'boards' && profilePageState.currentTab !== 'boards') {
        window.removeEventListener('scroll', boardFeedScroll);
        if (content.masonry) {
            content.masonry = null;
        }
        content.innerHTML = '';
        await UserBoard(username);
        newBoard?.classList.remove('hidden');
        history.state.lastTab = 'boards';
    }
};
