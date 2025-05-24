import type { IChat } from 'features/chat';
import { ChatStorage } from 'features/chat';
import { formatDateToReadable } from 'shared/utils';
import { createNewChat } from '../handlers/createNewChat';
import { openChat } from '../handlers/openChat';
import { Auth } from 'features/authorization';
import { navigate } from 'shared/router';
import template from './ChatList.hbs';
import './ChatList.scss';

interface IChatConfig {
    username: string;
    avatar: string;
    shortUsername: string;
    id: number | string;
    count: number | null;
    lastMessage?: {
        time: string;
        read: boolean;
        sent: boolean;
        own: boolean;
        message: string;
    };
    draft?: {
        message: string;
    }
}


export const ChatList = (rerender: boolean = false) => {
    if (!Auth.userData) return;
    const currentUser = Auth.userData.username;

    if (!ChatStorage.chatList) return;

    const chats = ChatStorage.chatList.map((item: IChat) => {
        const isLastOwn = currentUser === item?.last_message?.sender;
        const config: IChatConfig = {
            username: item.username,
            avatar: item.avatar,
            shortUsername: item.username[0].toUpperCase(),
            id: item.id,
            count: item.count !== 0 && !isLastOwn ? item.count : null,
        };
        if (item.last_message) {
            config.lastMessage = {
                time: formatDateToReadable(item.last_message.timestamp),
                read: isLastOwn && item.last_message.read,
                sent: isLastOwn && !item.last_message.read,
                own: isLastOwn,
                message: item.last_message.message,
            };
        }
        if (item.draft) {
            config.draft = {
                message: item.draft.message,
            };
        }
        return config;
    });

    if (rerender) {
        const chatList = document.querySelector<HTMLElement>('#chat-list');
        if (chatList) {
            const displayNone = chatList.style.display === 'none';
            chatList.innerHTML = template({ chats });
            chatList.style.display = displayNone ? 'none' : '';
        }
        const newChat = chatList?.querySelector('.create-chat-button');
        newChat?.addEventListener('click', createNewChat);
    } else {
        const container = document.createElement('div');
        container.innerHTML = template({ chats });

        const newChat = container.querySelector('.create-chat-button');
        newChat?.addEventListener('click', createNewChat);

        container.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const username = target.closest('.chat-preview__box-1__username');
            const publicName = target.closest('.chat-preview__box-1__public-name');

            if (username || publicName) {
                const chatItem = (username || publicName)?.closest('.chat-list-item');
                if (chatItem) {
                    const chatId = chatItem.id.split('-')[1];
                    const chat = ChatStorage.getChatByID(chatId);
                    if (chat) {
                        navigate(chat.username);
                        return;
                    }
                }
            }
            openChat(event);
        });

        return container.firstChild as HTMLDivElement;
    }
};
