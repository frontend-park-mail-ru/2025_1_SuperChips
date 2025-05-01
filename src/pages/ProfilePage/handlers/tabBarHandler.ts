import { appState, navigate } from 'shared/router';


const profilePageState = {
    currentTab: 'pin',
};

export const profileTabBarHandler = async (tabId: string, username: string) => {
    const content = document.querySelector('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins' && profilePageState.currentTab !== 'pins') {
        navigate(`${username}/flows`, true).finally();
    } else if (tabId === 'boards' && profilePageState.currentTab !== 'boards') {
        if (appState.masonryInstance) {
            appState.masonryInstance = null;
        }
        navigate(`${username}/boards`, true).finally();
        newBoard?.classList.remove('hidden');
    }
};
