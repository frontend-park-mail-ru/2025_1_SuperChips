import { logoutHandler } from '../handlers/logout';
import sidebarTemplate from './sidebar.hbs';
import './sidebar.scss';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 * @returns {HTMLDivElement}
 */
export const Sidebar = async () => {
    const sidebar = document.createElement('div');

    const buttons = [
        { id: 'newPin', source: '/icons/new-pin.svg', alt: 'add new pin', active: false },
        { id: 'chats', source: '/icons/chat.svg', alt: 'chats', active: false },
        { id: 'logout', source: '/icons/log-out.svg', alt: 'logout', active: true }
    ];

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({ buttons }));

    const logout = sidebar.querySelector('#logout');
    logout.addEventListener('click', logoutHandler);

    return sidebar;
};
