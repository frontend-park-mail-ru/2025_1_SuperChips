import { navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { User } from 'entities/User';
import './styles/fonts.scss';
import './styles/common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await User.fetchUserData();

    const navbar = document.getElementById('navbar');
    navbar?.replaceWith(await Navbar());

    const sidebar = document.getElementById('sidebar');
    sidebar?.replaceWith(await Sidebar());

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();
};
