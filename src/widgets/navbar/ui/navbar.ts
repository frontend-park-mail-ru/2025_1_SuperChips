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
    const navbar = document.getElementById('navbar');
    if (!navbar) return ;

    navbar.classList.add('navbar');

    const userData = User.getUserData();

    navbar.innerHTML = navbarTemplate(userData);

    const redirectButton = navbar.querySelector('#goToLogin');
    if (redirectButton) {
        redirectButton.addEventListener('click', async () => {
            navigate('login').finally();
        });
    }

    const anchorButton = navbar.querySelector('#scroll-to-top');
    if (anchorButton) {
        anchorButton.addEventListener('click', scrollToTop);
    }

    return navbar;
};
