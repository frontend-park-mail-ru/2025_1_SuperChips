import { ValidationResult } from './type';

/**
 * Валидация даты рождения
 */
export const validateBirthday = (
    birthday: string,
): ValidationResult => {
    const today = new Date();
    const date = new Date(birthday);

    if (date.getFullYear() <= 1900) {
        return { isValid: false, error: 'Год рождения должен быть >1900' };
    } else if (date.getTime() > today.getTime()) {
        return { isValid: false, error: 'Дата рождения не может быть в будущем' };
    }
    else if (isNaN(date.getTime())) {
        return { isValid: false, error: 'Введите дату в формате: ДД.ММ.ГГГГ' };
    }

    return { isValid: true, error: '' };
};
