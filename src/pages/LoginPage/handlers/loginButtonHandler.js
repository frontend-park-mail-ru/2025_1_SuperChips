import { validatePassword } from 'shared/validation';
import { validateEmail } from 'shared/validation';
import { debounce } from 'shared/utils';

const loginButtonHandler = () => {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    const valid = (validatePassword(password).isValid && validateEmail(email).isValid);

    const button = document.querySelector('.button');
    button.disabled = !valid;
};

export const debouncedLoginButton = debounce(loginButtonHandler, 300);
