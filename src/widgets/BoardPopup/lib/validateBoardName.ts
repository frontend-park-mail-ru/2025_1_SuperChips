import type { TPopupType } from '../ui/BoardPopup';
import type { ValidationResult } from 'shared/validation';
import { getBoardNames } from 'features/boardLoader';

export const validateBoardName = (type: TPopupType, boardName: string | null): ValidationResult => {
    const input = document.querySelector<HTMLInputElement>('#board-name');

    if (!input) return { isValid: true, error: '' };

    const boardNames = getBoardNames();

    const newName = input.value.trim();

    if (type === 'delete' && newName !== boardName) {
        return { isValid: false, error: 'Название доски не совпадает' };
    } else if (type === 'create' && newName === '') {
        return { isValid: false, error: 'В названии доски должен быть хотя бы 1 символ' };
    } else if ((type === 'create' || type === 'edit') && boardNames?.includes(newName)) {
        return { isValid: false, error: 'Такая доска уже существует' };
    }

    return { isValid: true, error: '' };
};
