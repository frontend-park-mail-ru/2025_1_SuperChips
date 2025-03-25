import { validateUsername } from 'shared/validation';
import { debounce } from 'shared/utils';

const profileValidation = (event: InputEvent): void => {
    const target = event.target as HTMLInputElement;
    const field = target.id;
    const value = target.value;

    const errorIcon = document.querySelector<HTMLElement>(`#${field}-error-icon`);
    const errorMessage = document.querySelector<HTMLElement>(`#${field}-error`);

    if (!errorIcon || !errorMessage) return;

    let showError = false;
    let errorText = '';

    switch (field) {
        case 'firstName':
            showError = !value.trim();
            errorText = 'Введите имя';
            break;
        case 'lastName':
            showError = !value.trim();
            errorText = 'Введите фамилию';
            break;
        case 'username':
            const validationResult = validateUsername(value);
            showError = !validationResult.isValid;
            errorText = validationResult.error;
            break;
        case 'birthday':
            const date = new Date(value);
            const today = new Date();
            showError = date > today;
            errorText = 'Некорректная дата рождения';
            break;
    }

    errorIcon.classList.toggle('hidden', !showError);
    errorMessage.classList.toggle('hidden', !showError);
    errorMessage.textContent = errorText;

    target.classList.toggle('error', showError);
};

export const debouncedProfileValidation = debounce(profileValidation, 300);