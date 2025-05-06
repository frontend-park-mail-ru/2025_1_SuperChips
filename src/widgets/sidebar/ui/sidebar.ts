import { logoutHandler } from '../handlers/logout';
import { openChatList } from '../handlers/openChatList';
import { handleBackButton } from '../handlers/handleBackButton';
import { appState, navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import sidebarTemplate from './sidebar.hbs';
import './sidebar.scss';

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 */
export const Sidebar = async () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return ;

    sidebar.classList.add('sidebar');
    if (!Auth.userData) {
        sidebar.classList.add('hidden');
    }

    const buttons = [
        {
            id: 'chats',
            source: '/public/icons/chat.svg',
            alt: 'chats',
            class: 'chat-icon'
        },
        {
            id: 'newPin',
            source: '/public/icons/plus-white.svg',
            alt: 'add new pin',
            class: 'new-pin-icon'
        },
        {
            id: 'settings',
            source: '/public/icons/settings-icon.svg',
            alt: 'settings',
            class: 'settings-icon',
        },
        {
            id: 'logout',
            source: '/public/icons/log-out.svg',
            alt: 'logout',
        }
    ];

    if (appState.mobile) {
        buttons.unshift({
            id: 'go-back-button',
            source: '/public/icons/arrow-left.svg',
            alt: 'go back',
        });
    }

    sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({ buttons, mobile: appState.mobile }));

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
    backButton?.addEventListener('click', handleBackButton);

    const chatButton = sidebar.querySelector('#chats');
    chatButton?.addEventListener('click', openChatList);

    window.addEventListener('newMessage', () => {
        const chatButton = document.querySelector('#chats');
        chatButton?.classList.add('notify');
    });
    window.addEventListener('allMessagesRead', () => {
        const chatButton = document.querySelector('#chats');
        chatButton?.classList.remove('notify');
    });

    return sidebar;
};
