import { UserPins } from 'widgets/UserPins';
import { UserBoard } from 'widgets/UserBoard';

const profilePageState = {
    currentTab: 'pin',
};

export const handleTabBar = async (tabId: string, username: string) => {
    const content = document.querySelector('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins' && profilePageState.currentTab !== 'pins') {
        content.innerHTML = '';
        await UserPins(username);
        newBoard?.classList.add('hidden');
    } else if (tabId === 'boards' && profilePageState.currentTab !== 'boards') {
        content.innerHTML = '';
        await UserBoard(username);
        newBoard?.classList.remove('hidden');
    }
};
