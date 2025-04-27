import { closeContactList } from '../handlers/closeContactList';
import template from './ContactList.hbs';
import './ContactList.scss';


// TODO Написать логику для получения списка контактов с сервера
const body = {
    data: [
        {
            username: 'valekirrr',
            public_name: 'valekir',
            avatar: 'https://yourflow.ru/static/avatars/5883b4d8-e794-4870-bca6-ee8927f5dc26.jpg',
        },
        {
            username: 'rissenberg',
            public_name: 'Костя',
            avatar: '',
        },
        {
            username: 'alx3.14vo',
            public_name: 'Саша',
            avatar: '',
        },
        {
            username: 'emreshaa',
            public_name: 'Эмре',
            avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
        },
        {
            username: 'forgeUp',
            public_name: 'Алексей',
            avatar: 'https://yourflow.ru/static/avatars/72962f60-7954-40c4-856c-4eac382c6a87.jpg',
        },
    ],
};

export interface IContact {
    username: string;
    public_name: string;
    avatar: string;
}


export const ContactList = () => {
    const container = document.createElement('div');

    const contacts = body.data.map((item: IContact) => {
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

    return container.firstChild as HTMLDivElement;
};
