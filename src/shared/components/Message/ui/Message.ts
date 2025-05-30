import type { IMessage } from 'features/chat';
import { formatDateToReadable } from 'shared/utils';
import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import messageTemplate from './Message.hbs';
import './Message.scss';


export const Message = (props: IMessage, unread: boolean = false) => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message-container');
    if (unread) newMessage.classList.add('unread');

    const own = Auth.userData?.username === props.sender;
    newMessage.innerHTML = messageTemplate({
        ...props,
        time: formatDateToReadable(props.timestamp, true),
        own: own,
        sent: own && !props.read,
        read: own && props.read,
    });

    if (props.message.includes(window.location.origin)) {
        const textElement = newMessage.querySelector('.message__text');
        const href = props.message.replace(window.location.origin, '').slice(1);
        if (textElement) {
            textElement.classList.add('link');
            textElement.addEventListener('click', () => navigate(href).finally());
        }
    }

    return newMessage;
};
