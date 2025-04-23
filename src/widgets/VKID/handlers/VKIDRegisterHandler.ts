import { validateUsername } from 'shared/validation';
import { Toast } from 'shared/components/Toast';
import { toggleInputError } from 'shared/components/input';
import { Auth } from 'features/authorization';


export const VKIDRegisterHandler = async (accessToken: string) => {

    const input = document.querySelector<HTMLInputElement>('#username');
    if (!input) return;
    const username = input.value;

    const valid = validateUsername(username).isValid && username !== '';
    if (!valid) return;

    const body = {
        access_token: accessToken,
        username: username,
    };

    const response = await Auth.VKIDRegister(body);
    if (response instanceof Response && response.status === 409) {
        const container = input.closest('.input-container');
        if (container) {
            toggleInputError(container, {
                isValid: false,
                error: 'Пользователь с такой почтой или именем уже существует'
            });
        }
    } else if (!(response instanceof Response && response.ok)) {
        Toast('Ошибка при регистрации. Попробуйте немного позже');
    }


};
