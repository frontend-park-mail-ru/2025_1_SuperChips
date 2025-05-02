import { closeChatList } from './closeChatList';
import { ChatList, openChat } from 'widgets/ChatList';
import { toggleScroll } from 'widgets/BoardPopup';
import { closeFilter } from 'widgets/navbar';
import { root } from 'app/app';
import { appState } from 'shared/router';


export const openChatList = () => {
    appState.isChatOpen = true;
    const container = document.createElement('div');
    container.classList.add('chat-container');
    container.id = 'chat-container';
    container.addEventListener('click', openChat);
    root.append(container);

    if (appState.mobile) {
        toggleScroll('disabled');
        document.querySelector('#settings')?.classList.remove('settings-icon-active');
        document.querySelector('#newPin')?.classList.remove('new-pin-icon-active');
    }

    if (appState.isFilterOpen) {
        closeFilter();
        appState.isFilterOpen = false;
    }

    const chatList = ChatList();
    container.appendChild(chatList);

    const chatButton = document.querySelector('#chats');
    if (chatButton) {
        chatButton.addEventListener('click', closeChatList);
        chatButton.removeEventListener('click', openChatList);
        chatButton.classList.add('chat-icon-active');
    }
};
