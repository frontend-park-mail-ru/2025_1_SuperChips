import { appState } from 'shared/router';

export const closeContactList = () => {
    appState.isChatOpen = false;
    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'flex';
    }

    const contactList = document.querySelector<HTMLDivElement>('#contact-list');
    contactList?.remove();
};
