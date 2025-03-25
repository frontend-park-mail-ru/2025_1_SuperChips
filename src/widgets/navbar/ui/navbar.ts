import navbarTemplate from './navbar.hbs';
import './navbar.scss';
import { User } from 'entities/User';
import { navigate } from 'shared/router';
import { scrollToTop } from '../handlers/scrollToTop';

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * Содержимое навбара меняется, в зависимости от того, авторизован ли пользователь
 */
export const Navbar = async () => {
    const navbar = document.createElement('div');

    const userData = User.getUserData();

    if (!userData.avatar && userData.authorized) {
        userData.shortUsername = userData.username[0].toUpperCase();
    }

    navbar.innerHTML += navbarTemplate(userData);

    const redirectButton = navbar.querySelector('#goToLogin');
    if (redirectButton) {
        redirectButton.addEventListener('click', async () => {
            navigate('login').finally();
        });
    }

    const anchorButton = navbar.querySelector('#scroll-to-top');
    anchorButton?.addEventListener('click', scrollToTop);

    return navbar;
};
