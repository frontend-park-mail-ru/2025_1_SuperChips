import { ValidationResult } from 'shared/types/ValidationResult';

/**
 * Валидация даты рождения
 */
export const validateBirthday = (
    birthday: string,
): ValidationResult => {
    const today = new Date();
    const date = new Date(birthday);
    const year = date.getFullYear();

    if (isNaN(date.getTime())) {
        return { isValid: false, error: 'Введите дату в формате: ДД.ММ.ГГГГ' };
    } else if (year <= 1900) {
        return { isValid: false, error: 'Год рождения должен быть >1900' };
    } else if (year > today.getFullYear()) {
        return { isValid: false, error: 'Год рождения не может быть в будущем' };
    } else if (date.getTime() > today.getTime()) {
        return { isValid: false, error: 'Дата рождения не может быть в будущем' };
    } else if (year > today.getFullYear() - 5) {
        return { isValid: false, error: 'Минимальный возраст - 5 лет' };
    }

    return { isValid: true, error: '' };
};
