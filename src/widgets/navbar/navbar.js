import { goToPage } from '../../shared/router/router';
import { Auth } from '../../features/authorization/api/auth';
import navbarTemplate from './navbar.hbs';
import './navbar.css';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * Содержимое навбара меняется, в зависимости от того, авторизован ли пользователь
 * @returns {HTMLDivElement}
 */
export const createNavbar = async () => {
    const navbar = document.createElement('div');

    const response = await Auth.getUserData();
    const body = await response.json();
    const userData = response.ok
        ? { ...body.data, authorized: true }
        : { authorized: false };

    if (!userData.avatar && userData.authorized) {
        userData.shortUsername = userData.username[0].toUpperCase();
    }

    navbar.innerHTML += navbarTemplate(userData);

    const redirectButton = navbar.querySelector('#redirect');
    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            goToPage('login');
        });
    }

    return navbar;
};
