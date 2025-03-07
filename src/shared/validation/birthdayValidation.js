/**
 * Валидация даты рождения
 * @param {string} birthday дата рождения
 * @returns {(boolean|string)[]}
 */
export const validateBirthday = (birthday) => {
    const today = new Date();
    const date = new Date(birthday);

    if (date.getFullYear() <= 1900) {
        return [false, 'Год рождения должен быть >1900'];
    } else if (date.getTime() > today.getTime()) {
        return [false, 'Дата рождения должна быть меньше текущего дня'];
    }

    return [birthday !== '', ''];
};