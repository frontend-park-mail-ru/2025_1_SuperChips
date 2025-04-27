export const closeContactList = () => {
    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'flex';
    }

    const contactList = document.querySelector<HTMLDivElement>('#contact-list');
    contactList?.remove();
};
