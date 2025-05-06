import { ChatStorage, IContact } from 'features/chat';
import { closeContactList } from '../handlers/closeContactList';
import template from './ContactList.hbs';
import './ContactList.scss';


export const ContactList = () => {
    const container = document.createElement('div');

    const contacts = ChatStorage.contacts.map((item: IContact) => {
        return {
            username: item.username,
            publicName: item.public_name,
            avatar: item.avatar,
            shortUsername: item.public_name[0].toUpperCase(),
        };
    });

    container.innerHTML = template({ contacts: contacts });

    const backButton = container.querySelector('.contact-list__back-button');
    backButton?.addEventListener('click', closeContactList);
    window.addEventListener('keydown', closeContactList);

    return container.firstChild as HTMLDivElement;
};
