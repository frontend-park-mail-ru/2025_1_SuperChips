import { debounce } from 'shared/utils';
import { toggleInputError } from 'shared/components/input';
import { validateUsername } from 'shared/validation';

const VKIDButtonHandler = () => {
    const submitButton = document.querySelector<HTMLButtonElement>('.VKID-popup__button');
    const usernameInput = document.querySelector<HTMLInputElement>('#username');
    const container = usernameInput?.closest('.input-container');
    if (!usernameInput || !container || !submitButton) return;

    const result = validateUsername(usernameInput.value);
    toggleInputError(container, result);
    submitButton.disabled = !result.isValid;
};

export const debouncedVKIDButtonHandler = debounce(VKIDButtonHandler, 300);
