import {validatePassword} from '../../../shared/validation/passwordValidation';
import {validateEmail} from '../../../shared/validation/emailValidation';

export const loginButtonHandler = () => {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;

    const valid = (validatePassword(password)[0] && validateEmail(email)[0]);

    const button = document.querySelector('.button');
    if (valid) {
        button.style.opacity = '100%';
    } else {
        button.style.opacity = '25%';
    }
};
