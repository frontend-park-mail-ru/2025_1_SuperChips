import { logoutHandler } from '../handlers/logout';
import { appState, navigate } from 'shared/router';
import sidebarTemplate from './sidebar.hbs';
import './sidebar.scss';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 */
export const Sidebar = async () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return ;

    sidebar.classList.add('sidebar');

    const buttons = [
        {
            id: 'chats',
            source: '/public/icons/chat.svg',
            alt: 'chats',
            active: false
        },
        {
            id: 'newPin',
            source: '/public/icons/new-pin.svg',
            alt: 'add new pin',
            active: true
        },
        {
            id: 'settings',
            source: '/public/icons/settings-icon.svg',
            alt: 'settings',
            active: true,
        },
        // {
        //     id: 'logout',
        //     source: '/public/icons/log-out.svg',
        //     alt: 'logout',
        //     active: true,
        // }
    ];

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({ buttons }));

    const logout = sidebar.querySelector('#logout');
    logout?.addEventListener('click', logoutHandler);

    const settings = sidebar.querySelector('#settings');
    settings?.addEventListener('click', () => {
        navigate('settings').finally();
    });

    const newPin = sidebar.querySelector('#newPin');
    newPin?.addEventListener('click', () => {
        navigate('flow/new').finally();
    });

    const backButton = sidebar.querySelector('#go-back-button');
    backButton?.addEventListener('click', () => {
        if (appState.lastPage) {
            history.back();
        } else {
            navigate('feed');
        }
    });

    return sidebar;
};
