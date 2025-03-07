import {validateSignup} from '../lib/signupValidation';
import {goToPage} from '../../../shared/router';

export const signupHandler = (event) => {
    event.preventDefault();

    const form = document.querySelector('.signup-form');

    const inputData = {};
    const inputs = form.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    if (validateSignup(inputData)) {
        goToPage('feed');
    }
};