import { closeChatList } from './closeChatList';
import { ChatList, openChat } from 'widgets/ChatList';
import { closeFilter } from 'widgets/navbar';
import { toggleScroll } from 'widgets/BoardPopup';
import { appState } from 'shared/router';
import { ChatStorage } from 'features/chat';


export const openChatList = () => {
    if (appState.chat.open) return;

    appState.chat.open = true;
    ChatStorage.sortChatList();
    ChatStorage.fetchContactList().finally();

    const container = document.createElement('div');
    container.classList.add('chat-container');
    container.id = 'chat-container';
    container.addEventListener('click', openChat);

    document.body.append(container);

    if (appState.mobile) {
        const goBack = document.querySelector<HTMLButtonElement>('#go-back-button');
        if (goBack) goBack.disabled = false;

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
