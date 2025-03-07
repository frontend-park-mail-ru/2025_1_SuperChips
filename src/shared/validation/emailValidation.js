/**
 * Валидация почты
 * @param {string} email - почта
 * @returns {(""|boolean|string)[]}
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return [email && emailRegex.test(email), 'Неправильный формат почты'];
};
