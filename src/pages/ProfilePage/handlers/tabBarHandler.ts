import { appState, navigate } from 'shared/router';


export const profileTabBarHandler = async (tabId: string, username: string) => {
    const content = document.querySelector('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins') {
        navigate(`${username}/flows`, true).finally();
    } else if (tabId === 'boards') {
        if (appState.masonryInstance) {
            appState.masonryInstance = null;
        }
        navigate(`${username}/boards`, true).finally();
        newBoard?.classList.remove('hidden');
    }
};
