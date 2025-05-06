import { appState, navigate } from 'shared/router';


export const profileTabBarHandler = async (tabId: string, username: string) => {
    const content = document.querySelector('#feed');
    if (!content) return;

    const newBoard = document.querySelector('.create-board');

    if (tabId === 'pins') {
        content.classList.remove('profile__feed--boards'); // Show bio card
        newBoard?.classList.add('hidden'); // Hide create board button
        navigate(`${username}/flows`, true).finally();
    } else if (tabId === 'boards') {
        if (appState.masonryInstance) {
            appState.masonryInstance = null;
        }
        navigate(`${username}/boards`, true).finally();
        content.classList.add('profile__feed--boards'); // Hide bio card
        newBoard?.classList.remove('hidden'); // Show create board button
    }
};
