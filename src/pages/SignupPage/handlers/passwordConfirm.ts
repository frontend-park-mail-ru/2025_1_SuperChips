import { debounce } from 'shared/utils';

const passwordConfirm = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement;
    if (target.id !== 'password' && target.id !== 'passwordConfirm') { return; }

    const password = document.querySelector<HTMLInputElement>('#password')?.value || '';
    const confirm = document.querySelector<HTMLInputElement>('#passwordConfirm')?.value || '';
    const message = document.querySelector<HTMLElement>('#passwordConfirm-error');
    const icon = document.querySelector<HTMLElement>('#passwordConfirm-error-icon');
    const eye = document.querySelector<HTMLElement>('#passwordConfirm-eye');

    if (!message || !icon || !eye) return;

    const showError = password !== confirm;
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    message.textContent = 'Пароли не совпадают';

    eye.style.right = showError ? '36px' : '12px';
};

export const debouncedPasswordConfirm = debounce(passwordConfirm, 300);