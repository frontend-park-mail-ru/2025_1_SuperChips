export const closeChat = () => {
    const chat = document.querySelector('#chat');
    chat?.remove();

    const chatList = document.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'flex';
    }
};
