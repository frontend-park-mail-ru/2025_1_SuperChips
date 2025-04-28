import { appState, navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { checkMobile } from 'shared/utils';
import { Auth } from 'features/authorization';
import './styles/fonts.scss';
import './styles/common.scss';


export const root = document.getElementById('root') as HTMLDivElement;

export const App = async () => {
    await Auth.fetchUserData();

    await Navbar();
    await Sidebar();
    appState.mobile = checkMobile();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();

    setTimeout(
        () => {
            const btn = document.querySelector<HTMLDivElement>('.dropdown-icon');
            btn?.click();
            document.querySelector<HTMLDivElement>('.dropdown__create-board')?.click();
        }
        , 100
    );
};
