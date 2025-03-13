import { goToPage } from '../shared/router/router';
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');


export const App = async () => {
    await goToPage('feed');
};
