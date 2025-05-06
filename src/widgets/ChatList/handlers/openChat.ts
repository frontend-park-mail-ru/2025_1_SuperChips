import { Chat } from 'widgets/Chat';

export const openChat = (event: Event) => {
    const target = event.target as HTMLElement;

    if (
        target.classList.contains('chat-container')
        || target.classList.contains('create-chat-button')
        || target.classList.contains('back-button')
    ) {
        return;
    }

    const preview = target.closest('.chat-list-item') ||
        target.closest('.contact-preview');

    const container = document.querySelector('.chat-container');
    if (!container || !preview) return;

    const contactList = document.querySelector('#contact-list');
    contactList?.remove();

    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'none';
    }

    const chatID = preview.id.split('-')[1];
    Chat(chatID).finally();
};
