import { validateEmail, validateUsername } from 'shared/validation';
import { Toast } from 'shared/components/Toast';
import { toggleInputError } from 'shared/components/input';
import { Auth } from 'features/authorization';


export const VKIDRegisterHandler = async (accessToken: string, status: number) => {
    let valid = false;

    const usernameInput = document.querySelector<HTMLInputElement>('#VKID-username');
    const emailInput = document.querySelector<HTMLInputElement>('#VKID-email');

    const username = usernameInput ? usernameInput.value : null;
    const email = emailInput ? emailInput.value : null;

    if (status === 404 && username) {
        valid = validateUsername(username).isValid && username !== '';
    } else if (status === 418 && email) {
        valid = validateEmail(email).isValid && email !== '';
    }

    if (!valid) return;

    const body = {
        access_token: accessToken,
        username: username ? username : '',
        email: email ? email : '',
    };

    const response = await Auth.VKIDRegister(body);
    if (!(response instanceof Response && response.ok)) {
        Toast('Ошибка при регистрации. Попробуйте немного позже');
        return;
    }

    if (response.status === 409) {
        if (usernameInput) {
            const container = usernameInput.closest('.input-container');
            if (container) {
                toggleInputError(container, {
                    isValid: false,
                    error: 'Почта или имя уже заняты'
                });
            }
        } else {
            Toast('Почта или имя уже заняты', 'error', 10000);
        }
    }
};
