import { Auth } from 'features/authorization';
import { navigate } from 'shared/router';

export const logoutHandler = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const button = document.querySelector('#logout');
    if (!button) return;

    const handleClickOutside = (e: Event) => {
        if (!button.contains(e.target as Node)) {
            button.classList.replace('sidebar-button_confirm', 'sidebar-button');
            const popup = document.querySelector('#logout-toast');
            popup?.remove();
            window.removeEventListener('click', handleClickOutside);
        }
    };

    if (button.classList.contains('sidebar-button')) {
        button.classList.replace('sidebar-button', 'sidebar-button_confirm');
        window.addEventListener('click', handleClickOutside, { once: true });
        Toast();
    } else {
        await Auth.logout();
        navigate('feed', true).finally();
        const popup = document.querySelector('#logout-toast');
        popup?.remove();
    }
};


// TODO изменить
const Toast = (): void => {
    const toast = document.createElement('div');
    toast.className = 'logout-toast';
    toast.textContent = 'Вы уверены, что хотите выйти?';
    toast.id = 'logout-toast';

    document.body.appendChild(toast);
};

