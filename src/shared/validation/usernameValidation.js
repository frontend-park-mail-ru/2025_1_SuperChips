/**
 * Валидация имени пользователя
 * @param {string} username имя пользователя
 * @returns {(boolean|string)[]}
 */
export const validateUsername = (username) => {
    if (username === '') {
        return [false, 'Введите имя пользователя'];
    }
    return [username !== '', 'Это имя уже занято'];
};
