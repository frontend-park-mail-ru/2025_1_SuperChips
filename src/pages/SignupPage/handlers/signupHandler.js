import { formatDateToISO } from 'shared/utils';
import { validateSignup } from '../lib/signupValidation';
import { navigate } from 'shared/router';
import { Auth } from 'features/authorization';
import { User } from 'entities/User';


export const signupHandler = async (event) => {
    event.preventDefault();

    const form = document.querySelector('.signup-form');

    const inputData = {};
    const inputs = form.querySelectorAll('.input__field');
    inputs.forEach(input => {
        if (input.id === 'birthday') {
            inputData[input.id] = formatDateToISO(input.value);
        }
        else {
            inputData[input.id] = input.value;
        }
    });

    if (!validateSignup(inputData)) {
        return;
    }
    delete inputData.passwordConfirm;

    const response = await Auth.register(inputData);

    if (response.ok) {
        await User.fetchUserData();
        navigate('feed').finally();
    }
    else {
        const emailIcon = document.querySelector('#email-error-icon');
        const message = document.querySelector('#email-error');
        const usernameIcon = document.querySelector('#username-error-icon');

        message.textContent = 'Пользователь с такой почтой или именем уже существует';
        message.classList.remove('hidden');
        emailIcon.classList.remove('hidden');
        usernameIcon.classList.remove('hidden');
    }
};
