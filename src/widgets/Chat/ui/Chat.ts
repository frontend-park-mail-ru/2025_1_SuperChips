import type { IMessage } from 'widgets/ChatList';
import { formatDateToReadable } from 'shared/utils';
import { closeChat } from '../handler/closeChat';
import { Auth } from 'features/authorization';
import chatTemplate from './Chat.hbs';
import messageTemplate from './Message.hbs';
import './Chat.scss';
import './Message.scss';


// TODO Написать логику для получения списка сообщений с сервера
const body = {
    data: {
        avatar: 'https://yourflow.ru/static/avatars/8651b82f-a1e6-404d-a07a-43f7cded9793.jpg',
        username: 'valekir',
        messages: [
            {
                sender: 'asdasdasd',
                message: 'bibaasdsdadassdaasdasasdassaddasdasdasdsadaasassddassdabobaasdasdasdasdadsasd',
                timestamp: '2020-04-26T22:13:00Z',
                read: false,
            },
            {
                sender: 'valekir',
                message: 'bibaboba',
                timestamp: '2025-04-25T22:13:00Z',
                read: true,
            },
            {
                sender: 'valekir',
                message: 'bibaboba',
                timestamp: '2025-04-24T22:13:00Z',
                read: true,
            },
            {
                sender: 'valekir',
                message: 'bibaboba',
                timestamp: '2025-04-23T22:13:00Z',
                read: true,
            },
            {
                sender: 'valekir',
                message: 'bibaboba',
                timestamp: '2025-04-22T22:13:00Z',
                read: true,
            },
            {
                sender: 'valekir',
                message: 'bibabobaasdasasdadsdasadsdasadsdasdasdasasdasdasdas',
                timestamp: '2025-04-21T22:13:00Z',
                read: true,
            },
        ],
    }
};


export const Chat = async (chatID: string) => {
    const container = document.querySelector('#chat-container');
    if (!container || !Auth.userData) return;

    const config = {
        shortUsername: body.data.username[0].toUpperCase(),
        username: body.data.username,
        avatar: body.data.avatar,
    };

    const chat = document.createElement('div');
    chat.innerHTML = chatTemplate(config);
    container.appendChild(chat.firstChild as HTMLDivElement);

    const backButton = container.querySelector('#chat__close-button');
    backButton?.addEventListener('click', closeChat);

    const currentUser = Auth.userData.username;

    const messages = body.data.messages.map((item: IMessage) => {
        const own = currentUser === item.sender;
        return {
            ...item,
            time: formatDateToReadable(item.timestamp),
            own: own,
            sent: own && !item.read,
            read: own && item.read,
        };
    });

    const messageBox = container.querySelector('.chat__messages');
    if (!messageBox) return;

    messages.forEach((message) => {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message-container');
        newMessage.innerHTML = messageTemplate({
            ...message,
            own: Auth.userData?.username === message.sender,
        });
        messageBox.insertAdjacentElement('afterbegin', newMessage);
    });
};
