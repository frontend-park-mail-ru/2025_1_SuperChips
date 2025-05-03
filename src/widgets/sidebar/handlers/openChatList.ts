import { closeChatList } from './closeChatList';
import { ChatList, openChat } from 'widgets/ChatList';
import { toggleScroll } from 'widgets/BoardPopup';
import { closeFilter } from 'widgets/navbar';
import { root } from 'app/app';
import { appState } from 'shared/router';
import { ChatStorage } from 'features/chat';


export const openChatList = () => {
    appState.chat.open = true;
    ChatStorage.sortChatList();
    const container = document.createElement('div');
    container.classList.add('chat-container');
    container.id = 'chat-container';
    container.addEventListener('click', openChat);
    root.append(container);

    if (appState.mobile) {
        toggleScroll('disabled');
        document.querySelector('#settings')?.classList.remove('active');
        document.querySelector('#newPin')?.classList.remove('active');
    }

    if (appState.isFilterOpen) {
        closeFilter();
        appState.isFilterOpen = false;
    }

    const chatList = ChatList();
    if (!chatList) return;
    container.appendChild(chatList);

    const chatButton = document.querySelector('#chats');
    if (chatButton) {
        chatButton.classList.add('active');
        chatButton.addEventListener('click', closeChatList);
        chatButton.removeEventListener('click', openChatList);
    }
};
