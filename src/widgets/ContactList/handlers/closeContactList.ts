export const closeContactList = (event: Event) => {
    if (event instanceof KeyboardEvent && event.key !== 'Escape') {
        return;
    }

    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'flex';
    }

    const contactList = document.querySelector<HTMLDivElement>('#contact-list');
    contactList?.remove();
};
