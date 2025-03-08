import './navbar.css';
import navbarTemplate from './navbar.hbs';
import {API} from '../../shared/api/api';
import {goToPage} from '../../shared/router';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * @returns {HTMLDivElement}
 */
export const createNavbar = async () => {
    const navbar = document.createElement('div');

    const userData = await API.get('/api/v1/auth/user');
    alert(Object.values(userData));
    // const userData = {
    //     username: 'Valekir',
    //     avatar: 'img/pfp1.jpg',
    //     birthday: '19.02.2006',
    //     email: 'alexkir15@yandex.ru',
    // };

    navbar.insertAdjacentHTML('beforeend', navbarTemplate(userData));

    const redirectButton = navbar.querySelector('#redirect');
    if (redirectButton) {
        redirectButton.addEventListener('click', () => {
            goToPage('login');
        });
    }

    return navbar;
};
