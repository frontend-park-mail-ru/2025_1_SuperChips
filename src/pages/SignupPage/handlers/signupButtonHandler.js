import { validateSignup } from '../lib/signupValidation';
import { debounce } from 'shared/utils';

const signupButtonHandler = () => {
    const form = document.querySelector('.signup-form');

    const inputData = {};
    const inputs = form.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    const button = document.querySelector('.button');
    button.disabled = !validateSignup(inputData);
};

export const debouncedSignupButton = debounce(signupButtonHandler, 300);
