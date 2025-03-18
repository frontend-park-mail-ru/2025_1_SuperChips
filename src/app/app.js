import { goToPage } from 'shared/router/router';
import { User } from 'entities/User';
import './fonts.scss';
import './common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await User.login();


    window.addEventListener('popstate', () => {
        goToPage(location.pathname, false);
    });

    await goToPage(location.pathname);
};
