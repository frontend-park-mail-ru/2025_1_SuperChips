import { openChatList } from './openChatList';
import { appState } from 'shared/router';
import { toggleScroll } from 'widgets/BoardPopup';

export const closeChatList = () => {
    const chatButton = document.querySelector('#chats');
    const chatList = document.querySelector<HTMLDivElement>('#chat-container');

    if (!chatList || !chatButton) return;

    appState.chat.open = false;
    if (appState.mobile) {
        const goBack = document.querySelector<HTMLButtonElement>('#go-back-button');
        if (goBack) goBack.disabled = true;

        toggleScroll('enabled');

        if (appState.activePage === 'newPin') {
            document.querySelector('#newPin')?.classList.add('active');
        }
        if (appState.activePage === 'settings') {
            document.querySelector('#settings')?.classList.add('settings-icon_active');
        }
    }

    chatButton.addEventListener('click', openChatList);
    chatButton.removeEventListener('click', closeChatList);
    chatButton.classList.remove('active');

    chatList.style.position = '';
    chatList.style.animation = 'FadeOutHorizontalLeft 0.3s ease-out';

    setTimeout(() => {
        chatList.remove();
    }, 300);
};
