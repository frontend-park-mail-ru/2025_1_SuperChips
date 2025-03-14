/**
 * Валидация почты
 * @param {string} email - почта
 * @returns {(""|boolean|string)[]}
 */
export const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return [email && regex.test(email), 'Введите email в формате user@domain.ru'];
};
