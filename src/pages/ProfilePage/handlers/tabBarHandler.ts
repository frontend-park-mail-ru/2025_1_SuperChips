import type { IFeed } from 'pages/FeedPage';
import { navigate } from 'shared/router';


const profilePageState = {
    currentTab: 'pin',
};

export const profileTabBarHandler = async (tabId: string, username: string) => {
    const content = document.querySelector<IFeed>('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins' && profilePageState.currentTab !== 'pins') {
        navigate(`${username}/flows`, true).finally();
    } else if (tabId === 'boards' && profilePageState.currentTab !== 'boards') {
        if (content.masonry) {
            content.masonry = null;
        }
        navigate(`${username}/boards`, true).finally();
        newBoard?.classList.remove('hidden');
    }
};
