import { validateSignup } from '../lib/signupValidation';
import { debounce } from 'shared/utils';
import type { ISignupFormData } from '../model/types';



const signupButtonHandler = (): void => {
    const form = document.querySelector<HTMLFormElement>('.signup-form');
    if (!form) return;

    const inputData: ISignupFormData = {
        email: '',
        username: '',
        birthday: '',
        password: '',
        passwordConfirm: '',
    };

    const inputs = form.querySelectorAll<HTMLInputElement>('.input__field');
    inputs.forEach(input => {
        const key = input.id as keyof ISignupFormData;
        inputData[key] = input.value;
    });

    const button = document.querySelector<HTMLButtonElement>('.button');
    if (!button) return;

    button.disabled = !validateSignup(inputData);
};

export const debouncedSignupButton = debounce(signupButtonHandler, 300);
