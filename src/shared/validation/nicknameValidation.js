/**
 * Валидация имени пользователя
 * @param {string} nickname имя пользователя
 * @returns {(boolean|string)[]}
 */
export const validateNickname = (nickname) => {
    if (nickname === '') {
        return [false, 'Введите имя пользователя'];
    }
    return [nickname !== '', 'Это имя уже занято'];
};
