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
        username: 'asdasdasd',
        messages: [
            {
                sender: 'valekir',
                message: 'Привет! Не откажусь, собираемся завтра, на пляже. Не забудь свою доску и хорошее настроение hadskjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjasdasdasdsdasadasdsadasdasdsa',
                timestamp: '2025-04-21T22:13:00Z',
                read: true,
            },
            {
                sender: 'asdasdasd',
                message: 'Летом?',
                timestamp: '2025-04-22T22:13:00Z',
                read: true,
            },
            {
                sender: 'asdasdasd',
                message: 'Через час?',
                timestamp: '2025-04-23T22:13:00Z',
                read: true,
            },
            {
                sender: 'asdasdasd',
                message: 'Завтра?',
                timestamp: '2025-04-24T22:13:00Z',
                read: true,
            },
            {
                sender: 'asdasdasd',
                message: 'Сегодня?',
                timestamp: '2025-04-25T22:13:00Z',
                read: true,
            },
            {
                sender: 'asdasdasd',
                message: 'Привет! Как тебе моя новая доска? Когда пойдем ловить волны?',
                timestamp: '2020-04-26T22:13:00Z',
                read: false,
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

    // Add logic for auto-resizing textarea and character counter
    const textarea = container.querySelector<HTMLTextAreaElement>('#chat-input');
    const charCounter = container.querySelector<HTMLDivElement>('#chat-char-counter');

    if (textarea && charCounter) {
        const maxHeight = 120; // Corresponds to max-height in SCSS
        const showCounterThreshold = 450;
        const maxLength = 500;

        textarea.addEventListener('input', () => {
            // Auto-resize logic
            textarea.style.height = 'auto'; // Reset height to recalculate
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

            // Character counter logic
            const currentLength = textarea.value.length;
            if (currentLength >= showCounterThreshold) {
                charCounter.textContent = `${currentLength}/${maxLength}`;
                charCounter.style.display = 'block';
            } else {
                charCounter.style.display = 'none';
            }
        });

        // Initial check in case the textarea is pre-filled
        const initialLength = textarea.value.length;
        if (initialLength >= showCounterThreshold) {
            charCounter.textContent = `${initialLength}/${maxLength}`;
            charCounter.style.display = 'block';
        }
        // Initial height adjustment
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
};
