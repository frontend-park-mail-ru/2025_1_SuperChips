import type { TPopupType } from '../ui/BoardPopup';
import { debounce } from 'shared/utils';
import { validateBoardName } from '../lib/validateBoardName';
import { toggleInputError } from 'shared/components/input';


const inputHandler = (type: TPopupType, boardName: string | null) => {
    const inputContainer = document.querySelector<HTMLDivElement>('.input-container');
    if (!inputContainer) return;

    const result = validateBoardName(type, boardName);
    toggleInputError(inputContainer, result);
    const button = document.querySelector<HTMLButtonElement>('#popup-button');

    if (result.isValid) {
        if (button) {
            button.disabled = false;
        }
    } else {
        if (button) {
            button.disabled = true;
        }
    }
};

export const debouncedInputHandler = debounce(inputHandler, 300);

