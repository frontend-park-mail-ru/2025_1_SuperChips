import { Toast } from 'shared/components/Toast';
import { ChatList } from 'widgets/ChatList';
import { Message } from 'shared/components/Message';
import { appState } from 'shared/router';
// import { Auth } from 'features/authorization';
import { API } from 'shared/api';
import { WEBSOCKET_URL } from 'shared/config/constants';


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
}

export interface IContact {
    username: string;
    public_name: string;
    avatar: string;
}


class chatStorage {
    chatList: IChat[] = [];
    contacts: IContact[] = [];
    ws: WebSocket;

    constructor() {
        this.ws = new WebSocket(WEBSOCKET_URL);

        this.ws.onmessage = (event: MessageEvent) => {
            try {
                const body = JSON.parse(event.data);
                const message: IMessage = {
                    ...body.data,
                    timestamp: new Date(body.data.timestamp),
                };
                this.getMessage(body.data.chat_id, message).finally();
            } catch { /**/
            }
        };
    }

    async fetchChatList() {
        // const response = await API.get('/chats');
        // if (!(response instanceof Response && response.ok)) return;
        // const body = await response.json();
        // body.data.chats.forEach((chat: IChat) => this.chatList.push(chat));
        // this.sortChatList();

        // TODO remove
        const chatListMock = [
            {
                id: '2',
                username: 'emreshaa',
                public_name: 'emreshaa',
                avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '3',
                username: 'alx3.13vo',
                public_name: 'alx3.13vo',
                avatar: 'https://yourflow.ru/static/avatars/1f5d30d1-b6b2-4079-ab95-50e9009d93d8.jpg',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '4',
                username: 'rissenberg',
                public_name: 'rissenberg',
                avatar: 'https://yourflow.ru/static/avatars/f2ee9d54-f261-4e19-86fe-73ef14348c08.jpg',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
            {
                id: '5',
                username: 'фывфыв',
                public_name: 'фывфыв',
                avatar: '',
                count: 0,
                last_message: null,
                messages: [],
            },
        ];
        chatListMock.forEach((chat: IChat) => this.chatList.push(chat));
        this.sortChatList();
    }

    async newChat(username: string) {
        // if (!username) return '';
        // const response = await API.post('/chats', { username });
        //
        // if (response instanceof Error || !response.ok) {
        //     Toast('Ошибка при создании чата');
        //     return null;
        // }
        //
        // const body = await response.json();
        //
        // this.chatList.push({
        //     username,
        //     public_name: body.data.public_name,
        //     avatar: body.data.avatar,
        //     last_message: null,
        //     id: body.data.id,
        //     count: 0,
        //     messages: []
        // });
        //
        // return body.data.id.toString();

        // TODO REMOVE
        const newChatMock: IChat = {
            id: '1',
            username: 'valekirrr',
            public_name: 'valekirrr',
            avatar: 'https://yourflow.ru/static/avatars/5883b4d8-e794-4870-bca6-ee8927f5dc26.jpg',
            count: 0,
            last_message: null,
            messages: [],
        };

        this.chatList.push(newChatMock);

        return newChatMock.id;
    }

    async fetchContactList() {
        // const response = await API.get('/contacts');
        // if (!(response instanceof Response && response.ok)) return;
        // const body = await response.json();
        // this.contacts = body.data.contacts;

        // TODO REMOVE
        const contactsMock = [
            {
                username: 'valekirrr',
                public_name: 'valekirrr',
                avatar: 'https://yourflow.ru/static/avatars/5883b4d8-e794-4870-bca6-ee8927f5dc26.jpg',
            },
            {
                username: 'rissenberg',
                public_name: 'Костя',
                avatar: '',
            },
            {
                username: 'alx3.14vo',
                public_name: 'Саша',
                avatar: '',
            },
            {
                username: 'emreshaa',
                public_name: 'Эмре',
                avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
            },
            {
                username: 'forgeUp',
                public_name: 'Алексей',
                avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
            },
        ];
        contactsMock.forEach((contact: IContact) => this.contacts.push(contact));
    }

    async newContact(username: string) {
        if (!username) return;
        const response = await API.post('/contacts', { username });
        if (response instanceof Error || !response.ok) {
            Toast('Ошибка при создании нового контакта');
            return;
        }

        const body = await response.json();

        this.contacts.push({
            username: username,
            public_name: body.data.public_name,
            avatar: body.data.avatar,
        });

        this.chatList.push({
            username: username,
            public_name: body.data.public_name,
            avatar: body.data.avatar,
            last_message: null,
            id: body.data.id,
            count: 0,
            messages: []
        });

        return body.data.id.toString();
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
        chat.messages.push(message);
        chat.last_message = message;
        chat.count = 0;

        // this.ws.send(JSON.stringify(message));

        // TODO REMOVE
        setTimeout(() => {
            this.markAsRead(chatID);
            setTimeout(() => {
                const chat = this.getChatByID(chatID);
                this.getMessage('1', {
                    message: 'bibaboba',
                    read: false,
                    sender: 'valekirrr',
                    timestamp: new Date,
                    id: chat?.messages.length ?? 0,
                }).finally();
            }, 1000);
        }, 1000);
    }

    async getMessage(chatID: string, message: IMessage) {
        let chat = this.getChatByID(chatID);

        if (!chat) {
            const newChatID = await this.newChat(message.sender);
            chat = this.getChatByID(newChatID);
            if (!chat) return;
        }
        chat.messages.push(message);
        chat.last_message = message;
        appState.chat.hasUnread = true;

        if (!chat.lastChanged) {
            this.setLastChanged(chatID);
        }

        const openChat = this.getChatByID(appState.chat.id);
        if (!appState.chat.open || (appState.chat.open && appState.chat.id !== chatID)) {
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
        if (!chat || !chat.last_message) return;
        chat.last_message.read = true;
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
            if (a.last_message && b.last_message) {
                return b.last_message.timestamp.getTime() - a.last_message.timestamp.getTime();
            } else if (a.last_message) {
                return -1;
            } else if (b.last_message) {
                return 1;
            } else {
                return 0;
            }
        });
        this.chatList[0].lastChanged = true;
    }
}

export const ChatStorage = new chatStorage();
