import { logoutHandler } from '../handlers/logout';
import { navigate } from 'shared/router';
import sidebarTemplate from './sidebar.hbs';
import './sidebar.scss';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 */
export const Sidebar = async () => {
    const sidebar = document.createElement('div');

    const buttons = [
        { id: 'newPin', source: '/public/icons/new-pin.svg', alt: 'add new pin', active: false },
        { id: 'chats', source: '/public/icons/chat.svg', alt: 'chats', active: false },
        { id: 'settings', source: '/public/icons/settings-icon.svg', alt: 'settings', active: false },
        { id: 'logout', source: '/public/icons/log-out.svg', alt: 'logout', active: false }
    ];

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({ buttons }));

    const logout = sidebar.querySelector('#logout');
    if (logout) {
        logout.addEventListener('click', logoutHandler);
    }

    const settings = sidebar.querySelector('#settings');
    if (settings) {
        settings.addEventListener('click', () => {
            navigate('settings').finally();
        });
    }

    return sidebar;
};
