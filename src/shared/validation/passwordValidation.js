/**
 * Валидация пароля
 * @param {string} password пароль
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9_]+$/;

    return (password.length >= 8) && regex.test(password);
}