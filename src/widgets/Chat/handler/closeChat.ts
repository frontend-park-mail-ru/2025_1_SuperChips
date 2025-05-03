import { ChatList } from 'widgets/ChatList';
import { appState } from 'shared/router';
import { ChatStorage, IMessage } from 'features/chat';


export const closeChat = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key !== 'Escape') return;

    const chat = document.querySelector('.chat');

    const message = document.querySelector<HTMLTextAreaElement>('#chat-input')?.value ?? '';
    const chatID = chat?.id?.split('-')[1] ?? '';

    chat?.remove();

    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'flex';
    }

    if (message !== '') {
        const draft: IMessage = {
            message: message,
            sender: '',
            timestamp: new Date,
            id: 0,
            read: false,
        };
        ChatStorage.setDraft(chatID, draft);
    }

    ChatStorage.sortChatList();
    ChatList(true);
    appState.chat.id = null;
    window.removeEventListener('keydown', closeChat);
};
