import { goToPage } from '../../../shared/router';
import { Auth } from '../../../features/authorization/auth';

export const handleSubmit = async (event) => {
    event.preventDefault();

    const inputData = {};
    const inputs = event.target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    // const result = await Auth.login(inputData);
    const result = {status: '403'};

    switch (result.status) {
    case '200':
        goToPage('feed');
        break;
    case '403': {
        const icon = document.querySelector('#password-error-icon');
        const message = document.querySelector('#password-error');
        const eye = document.querySelector('#password-eye');

        message.textContent = 'Неправильный пароль или почта';
        message.classList.remove('hidden');
        icon.classList.remove('hidden');
        eye.style.right = '36px';
        break;
    }
    default:
        break;
    }
};