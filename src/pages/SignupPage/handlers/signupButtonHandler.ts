import { validateSignup } from '../lib/signupValidation';
import { debounce } from 'shared/utils';

interface SignupFormData {
    [key: string]: string;
}

const signupButtonHandler = (): void => {
    const form = document.querySelector<HTMLFormElement>('.signup-form');
    if (!form) return;

    const inputData: SignupFormData = {};
    const inputs = form.querySelectorAll<HTMLInputElement>('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    const button = document.querySelector<HTMLButtonElement>('.button');
    if (!button) return;

    button.disabled = !validateSignup(inputData);
};

export const debouncedSignupButton = debounce(signupButtonHandler, 300);
