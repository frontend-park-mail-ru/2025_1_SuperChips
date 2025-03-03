/**
 * Валидация даты рождения
 * @param {string} birthday дата рождения
 * @returns {boolean}
 */
export const validateBirthday = (birthday) => {
    const today = new Date();
    const date = new Date(birthday);

    return !(birthday === '' || date.getTime() > today.getTime() || date.getFullYear() <= 1900);

}