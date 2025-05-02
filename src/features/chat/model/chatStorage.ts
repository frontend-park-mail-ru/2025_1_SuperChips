import { Auth } from 'features/authorization';
import { API } from 'shared/api';

export interface IMessage {
    sender: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export interface IChat {
    username: string;
    avatar: string;
    last_message: IMessage;
    count: number;
    id: string;
}

export interface IContact {
    username: string;
    public_name: string;
    avatar: string;
}


class chatStorage {
    chatList: IChat[] = [];
    contacts: IContact[] = [];

    constructor() {
        if (Auth.userData) {

        }
    }

    async fetchChatList() {
        API.get('');
    }
}

export const ChatStorage = new chatStorage();

