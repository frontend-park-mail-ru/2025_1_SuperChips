import { FeedPage } from '../../pages/FeedPage';
import { Login } from '../../pages/login';
import { Signup } from '../../pages/signup/ui/signup';

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
            render: Login
        },
        'signup': {
            href: '/signup',
            title: 'Регистрация',
            render: Signup
        }
    },
};