import type { IChat, IMessage } from 'features/chat';
import { ChatStorage } from 'features/chat';
import { Message } from 'shared/components/Message';
import { sendMessage } from '../handlers/sendMessage';
import { formatDateToReadable } from 'shared/utils';
import { textareaResizeHandler } from '../handlers/textareaResizeHandler';
import { chatSubmitHandler } from '../handlers/chatSubmitHandler';
import { closeChat } from '../handler/closeChat';
import { Auth } from 'features/authorization';
import { appState } from 'shared/router';
import chatTemplate from './Chat.hbs';
import './Chat.scss';
import { messageObserver } from '../handlers/readMessages';
import { openChatList } from 'widgets/sidebar';
import { navigate } from 'shared/router';


interface IChatState {
    observerInstance: IntersectionObserver | null;
    readMessages: Set<string>;
    chatInstance: IChat | null,
}

export const chatState: IChatState = {
    observerInstance: null,
    readMessages: new Set<string>(),
    chatInstance: null,
};


export const Chat = async (chatID: string) => {
    if (!Auth.userData) return;
    if (!appState.chat.open) {
        openChatList();
    }

    const container = document.querySelector('#chat-container');
    const chat = ChatStorage.getChatByID(chatID);
    if (!chat || !container) return;

    if (chat.count > 0) {
        chatState?.observerInstance?.disconnect();
        chatState.observerInstance = messageObserver();
        chatState.readMessages.clear();
        chatState.chatInstance = chat;
    }

    appState.chat.id = chatID;

    const config = {
        ...chat,
        shortUsername: chat.username[0].toUpperCase(),
    };

    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = chatTemplate(config);
    container.appendChild(chatWidget.firstChild as HTMLDivElement);

    const backButton = container.querySelector('#chat__close-button');
    backButton?.addEventListener('click', closeChat);
    window.addEventListener('keydown', closeChat);

    const username = container.querySelector('.chat-username');
    username?.addEventListener('click', () => navigate(chat.username));

    const publicName = container.querySelector('.chat-public-name');
    if (publicName) {
        publicName.addEventListener('click', () => navigate(chat.username));
    }

    const chatList = document.querySelector<HTMLDivElement>('.chat-list');
    if (chatList) {
        chatList.style.display = 'none';
    }

    const messageBox = container.querySelector<HTMLElement>('.chat__messages');
    if (!messageBox) return;

    const currentUser = Auth.userData.username;
    const firstUnread = chat.messages.length - chat.count;

    if (chat.messages.length > 0) {
        const messages = chat.messages.map((item: IMessage, index) => {
            const own = currentUser === item.sender;
            return {
                ...item,
                time: formatDateToReadable(item.timestamp),
                own: own,
                sent: own && !item.read,
                read: own && item.read,
                unread: index >= firstUnread,
            };
        });

        messages.forEach((item) => {
            messageBox.insertAdjacentElement('afterbegin', Message(item));
        });

        const unread = messageBox.querySelectorAll('.unread');
        if (unread.length > 0) {
            unread.forEach((item) => {
                chatState?.observerInstance?.observe(item);
            });
        }
    }
    const textarea = container.querySelector<HTMLTextAreaElement>('#chat-input');
    const charCounter = container.querySelector<HTMLDivElement>('#chat-char-counter');

    const chatInput = container.querySelector('#chat-input');
    if (chatInput) {
        messageBox.style.maxHeight = `${window.innerHeight - 220 - chatInput.clientHeight}px`;
    }

    textarea?.addEventListener('keydown', chatSubmitHandler);
    textarea?.addEventListener('input', textareaResizeHandler);
    if (!appState.mobile) {
        textarea?.focus();
    }

    if (textarea && charCounter && chat.draft) {
        textarea.value = chat.draft.message;

        const initialLength = textarea.value.length;

        if (initialLength >= 450) {
            charCounter.textContent = `${initialLength}/${500}`;
            charCounter.style.display = 'block';
        }
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }

    container.querySelector('.send-button')?.addEventListener('click', sendMessage);

    // todo fix
    // const messageElements = messageBox?.children;
    // if (messageElements && firstUnread > 0) {
    //     const target = messageElements[firstUnread] as HTMLElement;
    //     target?.scrollIntoView({ behavior: 'auto', block: 'start' });
    // }

    messageBox.scrollTop = messageBox.scrollHeight;
};
