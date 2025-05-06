import { chatState } from '../ui/Chat';
import { ChatStorage } from 'features/chat';
import { appState } from 'shared/router';


export const messageObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const element = entry.target as HTMLElement;
                const messageID = element.id;
                if (!(chatState.readMessages.has(messageID)) && chatState.chatInstance) {
                    chatState.chatInstance.count--;
                    chatState.readMessages.add(messageID);
                    if (chatState.chatInstance.count <= 0) {
                        const notify = ChatStorage.noUnread();
                        appState.chat.hasUnread = !notify;
                        if (notify) {
                            dispatchEvent(new Event('allMessagesRead'));
                        }
                        observer.disconnect();
                    }
                }
                observer.unobserve(element);
            }
        }
    }, {
        root: document.querySelector('.chat__messages'),
        threshold: 1,
    });
    return observer;
};
