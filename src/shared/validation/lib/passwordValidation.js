/**
 * Валидация пароля
 * @param {string} password пароль
 * @returns {(boolean|string)[]}
 */
export const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (password.length < 8) {
        return [false, 'Пароль должен быть не менее 8 символов'];
    } else if (password.length > 96) {
        return [false, 'Пароль должен быть не более 96 символов'];
    }else if (!regex.test(password)) {
        return [false, 'Пароль должен состоять из цифр или латинских букв'];
    }

    return [true, ''];
};
