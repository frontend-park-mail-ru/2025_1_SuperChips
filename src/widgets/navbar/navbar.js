import { User } from '../../entities/User';
import { goToPage } from '../../shared/router/router';
import navbarTemplate from './navbar.hbs';
import './navbar.scss';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * Содержимое навбара меняется, в зависимости от того, авторизован ли пользователь
 * @returns {HTMLDivElement}
 */
export const Navbar = async () => {
    const navbar = document.createElement('div');

    const userData = User.getUserData();

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
