import { navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { Auth } from 'features/authorization';
import './styles/fonts.scss';
import './styles/common.scss';


export const root = document.getElementById('root') as HTMLDivElement;

export const App = async () => {
    await Auth.fetchUserData();

    await Navbar();
    await Sidebar();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();

    try {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        } else {
            console.warn('⚠️ Service Worker not supported in this browser');
        }
    } catch {

    }
};
