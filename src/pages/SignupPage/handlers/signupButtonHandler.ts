import { validateSignup } from '../lib/signupValidation';
import { debounce } from 'shared/utils';
import { getInputData } from '../lib/getInputData';


const signupButtonHandler = (): void => {
    const inputData = getInputData();

    const button = document.querySelector<HTMLButtonElement>('.auth-page-button');
    if (!button) return;

    button.disabled = !validateSignup(inputData);
};

export const debouncedSignupButton = debounce(signupButtonHandler, 300);
