import { debounce } from 'shared/utils/debounce';

const passwordConfirm = (event) => {
    if (event.target.id !== 'password' && event.target.id !== 'passwordConfirm') { return; }

    const password = document.querySelector('#password').value;

    const confirm = document.querySelector('#passwordConfirm').value;
    const message = document.querySelector('#passwordConfirm-error');

    const icon = document.querySelector('#passwordConfirm-error-icon');
    const showError = password !== confirm;
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    message.textContent = 'Пароли не совпадают';

    const eye = document.querySelector('#passwordConfirm-eye');
    if (showError) {
        eye.style.right = '36px';
    } else {
        eye.style.right = '12px';
    }
};

export const debouncedPasswordConfirm = debounce(passwordConfirm, 300);
