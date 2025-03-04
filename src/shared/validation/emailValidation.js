/**
 * Валидация почты
 * @param {string} email - почта
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email && emailRegex.test(email);
}
