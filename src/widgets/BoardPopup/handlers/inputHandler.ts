import { debounce } from 'shared/utils';
import { validateBoardName } from '../lib/validateBoardName';
import type { TPopupType } from '../ui/BoardPopup';


const inputHandler = (type: TPopupType, boardName: string | null) => {
    const result = validateBoardName(type, boardName);
    const message = document.querySelector('#board-name-error');
    const icon = document.querySelector('#board-name-error-icon');

    if (!message || !icon) return;
    message.textContent = result.error;

    const showError = !result.isValid;

    icon.classList.toggle('hidden', !showError);
    message.classList.toggle('hidden', !showError);
};

export const debouncedInputHandler = debounce(inputHandler, 300);

