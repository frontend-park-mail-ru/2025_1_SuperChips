import { validateSignup } from '../lib/signupValidation';
import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { getInputData } from '../lib/getInputData';


export const signupHandler = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const form = document.querySelector<HTMLFormElement>('.signup-form');
    if (!form) return;

    const inputData = getInputData();

    if (!validateSignup(inputData)) {
        return;
    }
    delete inputData.passwordConfirm;


    const response = await Auth.register(inputData);

    if (response instanceof Error || !response.ok) {
        const emailIcon = document.querySelector('#email-error-icon');
        const message = document.querySelector('#email-error');
        const usernameIcon = document.querySelector('#username-error-icon');

        if (!emailIcon || !message || !usernameIcon) return;

        message.textContent = 'Почта или имя уже заняты';
        message.classList.remove('hidden');
        emailIcon.classList.remove('hidden');
        usernameIcon.classList.remove('hidden');
    } else {
        navigate('feed').finally();
        return;
    }
};
