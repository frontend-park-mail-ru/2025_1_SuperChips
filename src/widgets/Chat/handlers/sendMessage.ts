import { ChatStorage, IMessage } from 'features/chat';
import { Auth } from 'features/authorization';
import { Message } from 'shared/components/Message';
import { textareaResizeHandler } from './textareaResizeHandler';
import { ChatList } from 'widgets/ChatList';


export const sendMessage = () => {
    const textArea = document.querySelector<HTMLTextAreaElement>('#chat-input');
    const container = document.querySelector<HTMLDivElement>('.chat');
    const messageBox = document.querySelector<HTMLDivElement>('.chat__messages');

    if (!textArea || !container || !messageBox || !Auth.userData || textArea.value === '') return;

    const chatID = container.id.split('-')[1];
    const chat = ChatStorage.getChatByID(chatID);

    const config: IMessage = {
        sender: Auth.userData.username,
        message: textArea.value,
        timestamp: new Date,
        read: false,
        id: chat?.messages.length ?? 0,
    };

    ChatStorage.postMessage(chatID, config);
    if (!chat?.lastChanged) {
        ChatStorage.setLastChanged(chatID);
        ChatStorage.sortChatList();
    }
    ChatList(true);

    const newMessage = Message(config);
    messageBox.appendChild(newMessage);
    textArea.value = '';
    textareaResizeHandler();
    messageBox.scrollTop = messageBox.scrollHeight;
};
