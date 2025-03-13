import { Auth } from '../../features/authorization/api/auth';
import { API } from '../../shared/api/api';
import { goToPage } from '../../shared/router/router';
import sidebarTemplate from './sidebar.hbs';
import './sidebar.css';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 * @returns {HTMLDivElement}
 */
export const Sidebar = async () => {
    const sidebar = document.createElement('div');
    const logged = (await API.get('/api/v1/auth/user')).ok;

    const buttons = [
        { id: 'newPin', source: '/icons/new-pin.svg', alt: 'add new pin', active: false },
        { id: 'chats', source: '/icons/chat.svg', alt: 'chats', active: false },
        { id: 'logout', source: '/icons/log-out.svg', alt: 'logout', active: logged }
    ];

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({ buttons }));


    if (logged) {
        const logout = sidebar.querySelector('#logout');
        logout.addEventListener('click', async (event) => {
            event.preventDefault();
            await Auth.logout();
            await goToPage('feed');
        });
    }
    return sidebar;
};
