import { Chat } from 'widgets/Chat';
import { ChatStorage } from 'features/chat';

export const openChat = async (event: Event) => {
    const target = event.target as HTMLElement;

    if (
        target.classList.contains('chat-container')
        || target.classList.contains('create-chat-button')
        || target.classList.contains('back-button')
    ) {
        return;
    }

    const preview = target.closest('.chat-list-item') ||
        target.closest('.contact-list__item');

    const container = document.querySelector('.chat-container');
    if (!container || !preview) return;

    const contactList = document.querySelector('#contact-list');
    contactList?.remove();

    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'none';
    }

    let chatID = '';
    if (preview.classList.contains('chat-list-item')) {
        chatID = preview.id.split('-')[1];
    } else if (preview.classList.contains('contact-list__item')) {
        const username = preview.id.split('-')[1];
        const chat = ChatStorage.getChatByUsername(username);
        if (!chat) {
            const newChatID = await ChatStorage.newChat(username);
            if (!newChatID) return;
            chatID = newChatID.toString();
        } else {
            chatID = chat.id;
        }
    }

    Chat(chatID).finally();
};
