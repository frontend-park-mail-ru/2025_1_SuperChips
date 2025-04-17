import { navigate } from 'shared/router';
import { handleClickOutside } from 'shared/handlers/handleClickOutside';
import { Auth } from 'features/authorization';

export const logoutHandler = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const button = document.querySelector<HTMLElement>('#logout');
    if (!button) return;

    if (button.classList.contains('sidebar-button')) {
        button.classList.replace('sidebar-button', 'sidebar-button_confirm');
        window.addEventListener(
            'click',
            handleClickOutside(
                button,
                'sidebar-button_confirm',
                'sidebar-button',
                'logout-toast'
            ),
            { once: true }
        );
        const toast = '<div id="logout-toast" class="logout-toast">Вы уверены, что хотите выйти?</div>';
        document.body.insertAdjacentHTML('beforeend', toast);
    } else {
        await Auth.logout();
        navigate('feed', true).finally();
        const popup = document.querySelector('#logout-toast');
        popup?.remove();
    }
};
