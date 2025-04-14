import type { ISignupFormData } from '../model/types';

export const getInputData = () => {
    const inputData: ISignupFormData = {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    };

    const form = document.querySelector<HTMLFormElement>('.signup-form');
    if (!form) return inputData;

    const inputs = form.querySelectorAll<HTMLInputElement>('.input__field');
    inputs.forEach(input => {
        const key = input.id as keyof ISignupFormData;
        inputData[key] = input.value.trim();
    });

    return inputData;
};
