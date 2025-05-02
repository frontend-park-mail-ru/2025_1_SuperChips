import { openChatList } from './openChatList';

export const closeChatList = () => {
    const chatButton = document.querySelector('#chats');
    const chatList = document.querySelector<HTMLDivElement>('#chat-container');

    if (!chatList || !chatButton) return;

    chatButton.addEventListener('click', openChatList);
    chatButton.removeEventListener('click', closeChatList);

    chatList.style.position = '';
    chatList.style.animation = 'FadeOutHorizontalLeft 0.3s ease-out';

    setTimeout(() => {
        chatList.remove();
    }, 300);
};
