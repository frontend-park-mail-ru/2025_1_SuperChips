import { formatDateToISO } from 'shared/utils';
import { validateSignup } from '../lib/signupValidation';
import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { User } from 'entities/User';
import { ISignupFormData } from 'shared/types/SignupFormData';


export const signupHandler = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

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

        if (key === 'birthday') {
            inputData[key] = formatDateToISO(input.value);
        } else {
            inputData[key] = input.value;
        }
    });

    if (!validateSignup(inputData)) {
        return;
    }
    delete inputData.passwordConfirm;

    const response = await Auth.register(inputData);
    if (response instanceof Error) return;

    if (response.ok) {
        await User.fetchUserData();
        navigate('feed').finally();
    } else {
        const emailIcon = document.querySelector<HTMLElement>('#email-error-icon');
        const message = document.querySelector<HTMLElement>('#email-error');
        const usernameIcon = document.querySelector<HTMLElement>('#username-error-icon');

        if (!emailIcon || !message || !usernameIcon) return;

        message.textContent = 'Пользователь с такой почтой или именем уже существует';
        message.classList.remove('hidden');
        emailIcon.classList.remove('hidden');
        usernameIcon.classList.remove('hidden');
    }
};
