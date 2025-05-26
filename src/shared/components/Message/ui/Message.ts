import type { IMessage } from 'features/chat';
import { formatDateToReadable } from 'shared/utils';
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
    return newMessage;
};
