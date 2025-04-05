import type { TPopupType } from '../ui/BoardPopup';
import type { ValidationResult } from 'shared/validation';
import { getBoardList } from 'features/boardLoader';

export const validateBoardName = (type: TPopupType, boardName: string | null) => {
    const input = document.querySelector<HTMLInputElement>('#board-name');
    if (!input) return { isValid: true, error: '' };

    const newName = input.value;

    const boardList = getBoardList();

    const result: ValidationResult = {
        isValid: true,
        error: ''
    };

    if (type === 'edit' && newName === boardName) {
        result.isValid = false;
        result.error = 'Это уже является названием доски';
    } else if ((type === 'edit' || type === 'create') && (!!boardList && newName in boardList)) {
        result.isValid = false;
        result.error = 'Такая доска уже существует';
    } else if (type === 'delete' && !(!!boardList && newName in boardList)) {
        result.isValid = false;
        result.error = 'Такой доски не существует';
    } else if (type === 'delete' && (newName === boardName)) {
        result.isValid = false;
        result.error = 'Название доски не совпадает';
    } else if (newName === '') {
        return { isValid: false, error: 'Это поле обязательно' };
    }

    return result;
};
