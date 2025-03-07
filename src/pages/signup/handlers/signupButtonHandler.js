import {validateSignup} from '../lib/signupValidation';

export const signupButtonHandler = () => {
    const form = document.querySelector('.signup-form');

    const inputData = {};
    const inputs = form.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    const button = document.querySelector('.button');
    if (validateSignup(inputData)) {
        button.style.opacity = '100%';
    } else {
        button.style.opacity = '25%';
    }
};