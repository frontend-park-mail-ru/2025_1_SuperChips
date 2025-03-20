import { goToPage } from 'shared/router';
import { User } from 'entities/User';
import './fonts.scss';
import './common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await User.fetchUserData();


    window.addEventListener('popstate', async () => {
        await goToPage(location.pathname.slice(1));
    });

    await goToPage(location.pathname.slice(1), true);
};
