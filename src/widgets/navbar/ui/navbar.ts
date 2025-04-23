import navbarTemplate from './navbar.hbs';
import './navbar.scss';
import { navigate } from 'shared/router';
import { goToFeed } from '../handlers/goToFeed';
import { checkAvatar } from 'shared/utils';
import { Auth } from 'features/authorization';


/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * Содержимое навбара меняется, в зависимости от того, авторизован ли пользователь
 */
export const Navbar = async () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return ;

    navbar.classList.add('navbar');

    const userData = Auth.userData;
    const ok = await checkAvatar(Auth?.userData?.avatar);
    const config = {
        ...userData,
        authorized: !!userData,
        shortUsername: userData?.username[0].toUpperCase(),
        avatar: ok ? userData?.avatar : null,
    };

    navbar.innerHTML = navbarTemplate(config);

    const redirectButton = navbar.querySelector('#goToLogin');
    redirectButton?.addEventListener('click', async () => {
        navigate('login').finally();
    });

    const anchorButton = navbar.querySelector('#scroll-to-top');
    anchorButton?.addEventListener('click', goToFeed);

    const pfp = navbar.querySelector('.navbar__profile-picture');
    pfp?.addEventListener('click', goToProfile);

    return navbar;
};

const goToProfile = () => {
    if (Auth.userData)
        navigate(Auth.userData.username).finally();
};
