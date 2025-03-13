import { goToPage } from '../../../shared/router/router';
import { Auth } from '../../../features/authorization/api/auth';

export const handleLogin = async (event) => {
    event.preventDefault();

    const inputData = {};
    const inputs = event.target.querySelectorAll('.input__field');
    inputs.forEach(input => {
        inputData[input.id] = input.value;
    });

    const response = await Auth.login(inputData);

    if (response.ok) {
        await goToPage('feed');
    }
    else {
        const icon = document.querySelector('#password-error-icon');
        const message = document.querySelector('#password-error');
        const eye = document.querySelector('#password-eye');

        message.textContent = 'Неправильный пароль или почта';
        message.classList.remove('hidden');
        icon.classList.remove('hidden');
        eye.style.right = '36px';
    }
};