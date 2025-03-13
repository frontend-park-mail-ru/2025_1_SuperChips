import { FeedPage } from '../../pages/FeedPage';
import { renderLogin } from '../../pages/login/ui/login';
import { renderSignup } from '../../pages/signup/ui/signup';

export const config = {
    menu: {
        'feed': {
            href: '/feed',
            title: 'Лента',
            render: FeedPage,
            // authOnly: true,
            // showSidebar: true
        },
        'login': {
            href: '/login',
            title: 'Авторизация',
            render: renderLogin
        },
        'signup': {
            href: '/signup',
            title: 'Регистрация',
            render: renderSignup
        }
    },
};