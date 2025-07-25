import { Toast } from 'shared/components/Toast';
import { ChatList } from 'widgets/ChatList';
import { Message } from 'shared/components/Message';
import { appState } from 'shared/router';
import { API } from 'shared/api';
import { WS } from 'features/webSocket';


export interface IMessage {
    sender: string;
    message: string;
    timestamp: Date;
    read: boolean;
    id: number;
}

export interface IChat {
    username: string;
    public_name: string;
    avatar: string;
    last_message: IMessage | null;
    count: number;
    id: string;
    messages: IMessage[];
    lastChanged?: boolean,
    draft?: IMessage | null;
    chat_id?: number
}

export interface IContact {
    username: string;
    public_name: string;
    avatar: string;
}


class chatStorage {
    chatList: IChat[] = [];
    contacts: IContact[] = [];

    async fetchChatList() {
        const response = await API.get('/chats');
        if (!(response instanceof Response && response.ok)) return;
        const body = await response.json();

        if (!body.data) return;


        body.data.forEach((chat: IChat) => this.chatList.push({
            ...chat,
            id: chat.chat_id ? chat.chat_id.toString() : '',
            messages: chat.messages ? chat.messages : [],
        }));
        this.sortChatList();
        this.fetchAllChats().finally();
    }

    async newChat(username: string, forcedAvatar: string | null = null) {
        if (!username) return '';
        const response = await API.post('/chats', { username });

        if (response instanceof Error || !response.ok) {
            Toast('Ошибка при создании чата');
            return null;
        }

        const body = await response.json();
        if (!body.data) return;

        this.chatList.push({
            username,
            public_name: body.data.public_name,
            avatar: forcedAvatar ? forcedAvatar : body.data.avatar,
            last_message: null,
            id: body.data.chat_id.toString(),
            count: 0,
            messages: [],
        });

        return body.data.chat_id.toString();
    }

    async fetchAllChats() {
        if (this.chatList.length === 0) return;

        for (const chat of this.chatList) {
            const response = await API.get(`/chats?id=${chat.id}`);
            if (!(response instanceof Response && response.ok)) continue;
            const body = await response.json();

            if (chat.messages.length > 0) chat.messages = [];

            if (body.data.messages) {
                body.data.messages.forEach((message: IMessage) => {
                    chat.messages.push(message);
                });
            }
        }
    }

    async fetchContactList() {
        const response = await API.get('/contacts');
        if (!(response instanceof Response && response.ok)) return;
        const body = await response.json();

        if (body.data) {
            this.contacts = body.data;
        }
    }

    getChatByID(chatID: string | null) {
        if (!chatID) return undefined;
        return this.chatList.find((chat: IChat) => chat.id === chatID);
    }

    getChatByUsername(username: string | null) {
        if (!username) return;
        return this.chatList.find((chat: IChat) => chat.username === username);
    }

    postMessage(chatID: string, message: IMessage) {
        const chat = this.getChatByID(chatID);
        if (!chat) return;
        chat.messages.unshift(message);
        chat.last_message = message;
        chat.count = 0;

        const payload = {
            type: 'message',
            content: {
                chat_id: +chatID,
                recipient: chat.username,
                message: message.message,
                description: 'chat_message',
            },
        };
        WS.send(JSON.stringify(payload));
    }

    async getMessage(username: string, message: IMessage) {
        let chat = this.getChatByUsername(username);
        if (!chat) {
            const newChatID = await this.newChat(message.sender);
            chat = this.getChatByID(newChatID);
            if (!chat) return;
        }

        chat.messages.unshift(message);
        chat.count++;
        chat.last_message = message;
        appState.chat.hasUnread = true;

        if (!chat.lastChanged) {
            this.setLastChanged(chat.id);
        }

        const openChat = this.getChatByID(appState.chat.id);
        if (!appState.chat.open || (appState.chat.open && appState.chat.id !== chat.id)) {
            chat.count += 1;
            dispatchEvent(new Event('newMessage'));
        }
        if (appState.chat.open && appState.chat.id === null) {
            this.sortChatList();
            ChatList(true);
        } else if (appState.chat.id && message.sender === openChat?.username) {
            const messageBox = document.querySelector<HTMLDivElement>('.chat__messages');
            messageBox?.appendChild(Message(message, true));
        }
    }

    noUnread() {
        return this.chatList.filter(item => item.count !== 0).length === 0;
    }

    markAsRead(chatID: string) {
        const chat = this.getChatByID(chatID);
        if (!chat) return;
        if (chat.last_message) {
            chat.last_message.read = true;
        }
        chat.count = 0;
        chat.messages.map(message => {
            return { ...message, read: true, };
        });

        if (appState.chat.open && appState.chat.id === null) {
            this.sortChatList();
            ChatList(true);
        } else if (appState.chat.open && appState.chat.id === chatID) {
            const unread = document.querySelectorAll('.message__sent-icon');
            unread.forEach(item => {
                item.className = 'message__read-icon';
            });
        }
    }

    setLastChanged(chatID: string) {
        const chat = this.getChatByID(chatID);
        if (!chat) return;
        this.chatList.map((chat) => {
            return { ...chat, lastChanged: false };
        });
        chat.lastChanged = true;
    }

    setDraft(chatID: string, message: IMessage) {
        const chat = this.getChatByID(chatID);
        if (!chat) return;
        chat.draft = message;
    }

    sortChatList() {
        if (!this.chatList[0]) return;
        this.chatList.sort((a, b) => {
            if (a.last_message?.timestamp && b.last_message?.timestamp) {
                return new Date(b.last_message.timestamp).getTime() - new Date(a.last_message.timestamp).getTime();
            } else if (a.last_message?.timestamp) {
                return -1;
            } else if (b.last_message?.timestamp) {
                return 1;
            } else {
                return 0;
            }
        });
        this.chatList[0].lastChanged = true;
    }

    clear() {
        WS.close();
        this.chatList = [];
        this.contacts = [];
    }
}

export const ChatStorage = new chatStorage();
