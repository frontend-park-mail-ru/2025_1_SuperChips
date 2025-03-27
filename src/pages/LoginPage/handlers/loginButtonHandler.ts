import { validatePassword } from 'shared/validation';
import { validateEmail } from 'shared/validation';
import { debounce } from 'shared/utils';

const loginButtonHandler = () => {
    const passwordField = document.querySelector<HTMLInputElement>('#password');
    const emailField = document.querySelector<HTMLInputElement>('#email');

    if (!passwordField || !emailField) return;

    const password = passwordField.value;
    const email = emailField.value;


    const valid = (validatePassword(password).isValid && validateEmail(email).isValid);

    const button = document.querySelector<HTMLButtonElement>('.button');
    if (button) {
        button.disabled = !valid;
    }
};

export const debouncedLoginButton = debounce(loginButtonHandler, 300);
