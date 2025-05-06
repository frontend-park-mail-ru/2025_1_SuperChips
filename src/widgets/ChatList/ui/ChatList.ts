import type { IChat } from '../model/types';
import { formatDateToReadable } from 'shared/utils';
import { createNewChat } from '../handlers/createNewChat';
import { openChat } from '../handlers/openChat';
import { Auth } from 'features/authorization';
import template from './ChatList.hbs';
import './ChatList.scss';


interface IResponse {
    data: IChat[];
}

// TODO Написать логику для получения списка чатов с сервера
const body: IResponse = {
    data: [
        {
            id: '1',
            username: 'valekir',
            avatar: 'https://yourflow.ru/static/avatars/5883b4d8-e794-4870-bca6-ee8927f5dc26.jpg',
            count: 12,
            last_message: {
                sender: 'asdasdasd',
                message: 'bibaboba',
                read: false,
                timestamp: '2025-04-27T00:23:00Z',
            }
        },
        {
            id: '2',
            username: 'emreshaa',
            avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
            count: 14,
            last_message: {
                sender: 'emreshaa',
                message: '; DROP DATABASE',
                read: true,
                timestamp: '2024-02-19T00:00:00Z',
            }
        },
        {
            id: '3',
            username: 'alx3.13vo',
            avatar: 'https://yourflow.ru/static/avatars/1f5d30d1-b6b2-4079-ab95-50e9009d93d8.jpg',
            count: 22,
            last_message: {
                sender: 'alx3.14vo',
                message: 'хихихиха',
                read: true,
                timestamp: '2025-04-26T00:00:00Z',
            }
        },
        {
            id: '4',
            username: 'rissenberg',
            avatar: 'https://yourflow.ru/static/avatars/f2ee9d54-f261-4e19-86fe-73ef14348c08.jpg',
            count: 0,
            last_message: {
                sender: 'asdasdasd',
                message: 'помоги пж с домашкой',
                read: true,
                timestamp: '2025-04-26T00:00:00Z',
            }
        },
        {
            id: '5',
            username: 'фывфыв',
            avatar: '',
            count: 0,
            last_message: {
                sender: 'фывфыв',
                message: 'Привет',
                read: true,
                timestamp: '2025-04-26T00:00:00Z',
            }
        },
    ],
};

export const ChatList = (animated: boolean = false) => {
    const container = document.createElement('div');

    if (!Auth.userData) return container;
    const currentUser = Auth.userData.username;

    const chats = body.data.map((item) => {
        const isLastOwn = currentUser === item.last_message.sender;
        return {
            username: item.username,
            avatar: item.avatar,
            shortUsername: item.username[0].toUpperCase(),
            time: formatDateToReadable(item.last_message.timestamp),
            read: isLastOwn && item.last_message.read,
            sent: isLastOwn && !item.last_message.read,
            own: isLastOwn,
            message: item.last_message.message,
            id: item.id,
            count: item.count !== 0 && !isLastOwn ? item.count : null,
        };
    });

    container.innerHTML = template({ chats: chats });

    const newChat = container.querySelector('.create-chat-button');
    newChat?.addEventListener('click', createNewChat);

    container.addEventListener('click', openChat);

    return container.firstChild as HTMLDivElement;
};
