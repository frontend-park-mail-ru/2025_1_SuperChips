import { navigate } from 'shared/router';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { Auth } from 'features/authorization';
import './styles/fonts.scss';
import './styles/common.scss';
import { API } from '../shared/api';


export const root = document.getElementById('root') as HTMLDivElement;


export const App = async () => {
    await Auth.fetchUserData();
    await Auth.fetchPolls();

    await Navbar();
    await Sidebar();

    window.addEventListener('popstate', () => {
        navigate(location.pathname.slice(1), true).finally();
    });

    navigate(location.pathname.slice(1), true).finally();

    if (Auth.userData) {
        const newFrame = document.createElement('iframe');
        newFrame.classList.add('display-none');
        newFrame.classList.add('CSAT-iframe');
        newFrame.src = '/iframe.html';
        newFrame.id = 'CSAT-frame';
        document.body.appendChild(newFrame);
        window.onmessage = (event) => {
            if (event.data === 'close-iframe') {
                newFrame.classList.add('display-none');
            }
        };
    }
}
;
