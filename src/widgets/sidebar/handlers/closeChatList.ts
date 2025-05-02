import { openChatList } from './openChatList';
import { appState } from 'shared/router';
import { toggleScroll } from 'widgets/BoardPopup';

export const closeChatList = () => {
    const chatButton = document.querySelector('#chats');
    const chatList = document.querySelector<HTMLDivElement>('#chat-container');

    if (!chatList || !chatButton) return;

    appState.isChatOpen = false;
    if (appState.mobile) {
        toggleScroll('enabled');
        if (appState.activePage === 'newPin') {
            document.querySelector('#newPin')?.classList.add('new-pin-icon-active');
        }
        if (appState.activePage === 'settings') {
            document.querySelector('#settings')?.classList.add('settings-icon-active');
        }
    }

    chatButton.classList.remove('chat-icon-active');
    chatButton.addEventListener('click', openChatList);
    chatButton.removeEventListener('click', closeChatList);

    chatList.style.position = '';
    chatList.style.animation = 'FadeOutHorizontalLeft 0.3s ease-out';

    setTimeout(() => {
        chatList.remove();
    }, 300);
};
