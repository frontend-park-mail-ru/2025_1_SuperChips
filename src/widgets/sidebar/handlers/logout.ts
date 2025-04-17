import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';

export const logoutHandler = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const button = document.querySelector<HTMLElement>('#logout');
    if (!button) return;

    const clickHandler = (e: Event) => {
        if (!button.contains(e.target as Node)) {
            button.classList.replace('sidebar-button_confirm', 'sidebar-button');
            document.querySelector('#logout-toast')?.remove();
            window.removeEventListener('click', clickHandler);
        }
    };

    if (button.classList.contains('sidebar-button')) {
        button.classList.replace('sidebar-button', 'sidebar-button_confirm');
        window.addEventListener('click', clickHandler);
        const toast = '<div id="logout-toast" class="logout-toast">Вы уверены, что хотите выйти?</div>';
        document.body.insertAdjacentHTML('beforeend', toast);
    } else {
        await Auth.logout();
        navigate('feed', true).finally();
        const popup = document.querySelector('#logout-toast');
        popup?.remove();
    }
};
