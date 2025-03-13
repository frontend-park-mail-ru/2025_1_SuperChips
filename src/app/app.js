import { goToPage, UrlHandler } from '../shared/router/router';
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');


export const App = async () => {
    window.addEventListener('onpopstate', UrlHandler);
    await goToPage('feed');
};
