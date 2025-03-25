import { validatePassword } from 'shared/validation';
import { validateEmail } from 'shared/validation';
import { debounce } from 'shared/utils';

const loginButtonHandler = () => {
    const passwordField = document.querySelector('#password') as HTMLInputElement;
    const emailField = document.querySelector('#email') as HTMLInputElement;

    if (!passwordField || !emailField) return;

    const password = passwordField.value;
    const email = emailField.value;


    const valid = (validatePassword(password).isValid && validateEmail(email).isValid);

    const button = document.querySelector('.button') as HTMLButtonElement;
    button.disabled = !valid;
};

export const debouncedLoginButton = debounce(loginButtonHandler, 300);
