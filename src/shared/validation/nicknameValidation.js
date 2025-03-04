/**
 * Валидация имени пользователя
 * @param {string} nickname имя пользователя
 * @returns {boolean}
 */
export const validateNickname = (nickname) => {
    return nickname !== '';
}