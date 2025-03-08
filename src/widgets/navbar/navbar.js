import './navbar.css';
import navbarTemplate from './navbar.hbs';
import {API} from '../../shared/api/api';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * @returns {HTMLDivElement}
 */
export const createNavbar = async () => {
    const navbar = document.createElement('div');

    // const userData = await API.get('/api/v1/auth/user');
    const userData = {
        username: 'Valekir',
        avatar: 'img/pfp1.jpg',
        birthday: '19.02.2006',
        email: 'alexkir15@yandex.ru',
    };

    navbar.insertAdjacentHTML('beforeend', navbarTemplate(userData));

    return navbar;
};
