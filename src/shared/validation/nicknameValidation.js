/**
 * Валидация имени пользователя
 * @param {string} nickname имя пользователя
 * @returns {(boolean|string)[]}
 */
export const validateNickname = (nickname) => {
    return [nickname !== '', "Это имя уже занято"];
}