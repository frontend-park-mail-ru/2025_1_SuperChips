import {goToPage} from '../../shared/router';
import {API} from '../../shared/api/api';
import navbarTemplate from './navbar.hbs';
import './navbar.css';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * @returns {HTMLDivElement}
 */
export const createNavbar = async () => {
    const navbar = document.createElement('div');

    const response = await API.get('/api/v1/auth/user');
    const userData = response.ok
        ? { ...response.data, authorized: true }
        : { authorized: false };

    navbar.innerHTML += navbarTemplate(userData);

    const redirectButton = navbar.querySelector('#redirect');
    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            goToPage('login');
        });
    }

    return navbar;
};
