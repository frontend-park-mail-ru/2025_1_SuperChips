import { closeChatList } from './closeChatList';
import { ChatList, openChat } from 'widgets/ChatList';
import { root } from 'app/app';

export const openChatList = () => {
    const container = document.createElement('div');
    container.classList.add('chat-container');
    container.id = 'chat-container';
    container.addEventListener('click', openChat);
    root.append(container);

    const chatList = ChatList();
    container.appendChild(chatList);

    const chatButton = document.querySelector('#chats');
    chatButton?.addEventListener('click', closeChatList);
    chatButton?.removeEventListener('click', openChatList);
};
