import { debounce } from 'shared/utils';

const passwordConfirm = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.id !== 'passwordConfirm') return;

    const password = document.querySelector<HTMLInputElement>('#password')?.value || '';
    const confirm = document.querySelector<HTMLInputElement>('#passwordConfirm')?.value || '';
    const message = document.querySelector('#passwordConfirm-error');
    const icon = document.querySelector('#passwordConfirm-error-icon');
    const eye = document.querySelector<HTMLImageElement>('#passwordConfirm-eye');

    if (!message || !icon || !eye) return;

    const showError = password && confirm && password !== confirm;
    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
    message.textContent = 'Пароли не совпадают';

    eye.style.right = showError ? '36px' : '12px';
    eye.style.filter = 'brightness(1.5)';
};

export const debouncedPasswordConfirm = debounce(passwordConfirm, 300);
