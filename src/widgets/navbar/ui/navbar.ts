import navbarTemplate from './navbar.hbs';
import './navbar.scss';
import { appState, navigate } from 'shared/router';
import { goToFeed } from '../handlers/goToFeed';
import { checkAvatar } from 'shared/utils';
import { openFilter } from '../handlers/openFilter';
import { search } from '../handlers/search';
import { Auth } from 'features/authorization';
import { clearSearch } from '../handlers/clearSearch';
import { openNotifications } from '../handlers/openNotifications';


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
        mobile: appState.mobile,
    };

    navbar.innerHTML = navbarTemplate(config);

    const redirectButton = navbar.querySelector('#goToLogin');
    redirectButton?.addEventListener('click', async () => {
        navigate('login').finally();
    });

    const anchorButton = navbar.querySelector('.navbar-logo');
    anchorButton?.addEventListener('click', goToFeed);

    const pfp = navbar.querySelector('.navbar__profile-picture');
    pfp?.addEventListener('click', goToProfile);

    const filter = navbar.querySelector('#filter-button');
    filter?.addEventListener('click', openFilter);

    const searchBar = navbar.querySelector('.search-form-container');
    searchBar?.addEventListener('submit', search);

    const clearButton = navbar.querySelector('.search-form__clear');
    clearButton?.addEventListener('click', clearSearch);

    const notificationButton = navbar.querySelector('.navbar__notification');
    notificationButton?.addEventListener('click', openNotifications);

    return navbar;
};

const goToProfile = () => {
    if (Auth.userData)
        navigate(Auth.userData.username).finally();
};
