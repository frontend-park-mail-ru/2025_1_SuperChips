import { formatDateToISO } from '../../../shared/utils/formateDate';
import { validateSignup } from '../lib/signupValidation';
import { goToPage } from '../../../shared/router/router';
import { Auth } from '../../../features/authorization/api/auth';


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

        await goToPage('feed');
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
