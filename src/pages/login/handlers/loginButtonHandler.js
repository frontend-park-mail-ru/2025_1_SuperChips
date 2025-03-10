import {validatePassword} from '../../../shared/validation/passwordValidation';
import {validateEmail} from '../../../shared/validation/emailValidation';
import {debounce} from '../../../shared/utils/debounce';

const loginButtonHandler = () => {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    const valid = (validatePassword(password)[0] && validateEmail(email)[0]);

    const button = document.querySelector('.button');
    button.disabled = !valid;
};

export const debouncedLoginButton = debounce(loginButtonHandler, 300);
