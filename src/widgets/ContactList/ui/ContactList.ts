import { ChatStorage, IContact } from 'features/chat';
import { closeContactList } from '../handlers/closeContactList';
import { navigate } from 'shared/router';
import { createNewChat } from 'widgets/ChatList/handlers/createNewChat';
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

    if (ChatStorage.contacts.length === 0) {
        const contactList = container.firstChild as HTMLDivElement;
        contactList.innerHTML += '<span class="white">Подпишитесь на человека чтобы он появился у вас в контактах</span>';
    }

    const backButton = container.querySelector('.contact-list__back-button');
    backButton?.addEventListener('click', closeContactList);
    window.addEventListener('keydown', closeContactList);

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const contactItem = target.closest('.contact-list__item');
        const publicName = target.closest('.contact-preview__public-name');

        if (contactItem) {
            const username = contactItem.id.split('-')[1];
            if (username) {
                navigate(username).finally();
                return;
            }
        }

        if (publicName) {
            const contactItem = publicName.closest('.contact-list__item');
            if (contactItem) {
                const username = contactItem.id.split('-')[1];
                if (username) {
                    navigate(username).finally();
                    return;
                }
            }
        }

        createNewChat(event);
    });

    return container.firstChild as HTMLDivElement;
};
