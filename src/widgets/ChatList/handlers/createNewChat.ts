import { ContactList } from 'widgets/ContactList';


export const createNewChat = (event: Event) => {
    event.stopPropagation();
    const contactList = ContactList();

    const chatContainer = document.querySelector('.chat-container');
    if (!chatContainer) return;

    const chatList = chatContainer.querySelector<HTMLDivElement>('#chat-list');
    if (chatList) {
        chatList.style.display = 'none';
    }

    chatContainer.appendChild(contactList);
};
