import { debounce } from 'shared/utils';
import { toggleInputError } from 'shared/components/input';
import { validateEmail, validateUsername } from 'shared/validation';

const VKIDValidate = () => {
    const submitButton = document.querySelector<HTMLButtonElement>('.VKID-popup__button');
    const usernameInput = document.querySelector<HTMLInputElement>('#VKID-username');
    const usernameContainer = usernameInput?.closest('.input-container');
    const emailInput = document.querySelector<HTMLInputElement>('#VKID-email');
    const emailContainer = emailInput?.closest('.input-container');

    if (!usernameInput || !usernameContainer || !submitButton || !emailContainer || !emailInput) return;

    const usernameResult = validateUsername(usernameInput.value);
    const emailResult = validateEmail(emailInput.value);

    toggleInputError(usernameContainer, usernameResult);
    toggleInputError(emailContainer, emailResult);
    submitButton.disabled = !(usernameResult.isValid && emailResult.isValid);
};

export const VKIDValidation = debounce(VKIDValidate, 300);


const VKIDValidateUsername = () => {
    const submitButton = document.querySelector<HTMLButtonElement>('.VKID-popup__button');
    const usernameInput = document.querySelector<HTMLInputElement>('#VKID-username');
    const usernameContainer = usernameInput?.closest('.input-container');

    if (!usernameInput || !usernameContainer || !submitButton) return;

    const usernameResult = validateUsername(usernameInput.value);

    toggleInputError(usernameContainer, usernameResult);
    submitButton.disabled = !usernameResult.isValid;
};

export const VKIDUsernameValidation = debounce(VKIDValidateUsername, 300);
