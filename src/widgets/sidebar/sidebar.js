import {Auth} from '../../features/authorization/auth';
import sidebarTemplate from './sidebar.hbs';
import {goToPage} from '../../shared/router';
import './sidebar.css';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 * @returns {HTMLDivElement}
 */
export const createSidebar = async () => {
    const sidebar = document.createElement('div');

    const buttons = [
        {id: 'newPin', source: '/icons/new-pin.svg', alt: 'add new pin', active: false},
        {id: 'chats', source: '/icons/chat.svg', alt: 'chats', active: false},
        {id: 'logout', source: '/icons/log-out.svg', alt: 'logout', active: await Auth.getUserData().ok}
    ];

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({buttons}));

    const logout = sidebar.querySelector('#logout');
    logout.addEventListener('click', async (event) => {
        event.preventDefault();
        await Auth.logout();
        await goToPage('feed');
    });

    return sidebar;
};
