/**
 * Валидация имени пользователя
 * @param {string} username имя пользователя
 * @returns {(boolean|string)[]}
 */
export const validateUsername = (username) => {
    if (username === '') {
        return [false, 'Введите имя пользователя'];
    } else if (username.length < 2) {
        return [false, 'Имя пользователя должно быть не менее 2 символов'];
    } else if (username.length > 32) {
        return [false, 'Имя пользователя должно быть не более 32 символов'];
    }
    return [username !== '', 'Это имя уже занято'];
};
