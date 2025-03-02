/**
 *
 * @param {string} password
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9_]+$/;

    return (password.length >= 8) && regex.test(password);
}