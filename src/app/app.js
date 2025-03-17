import { goToPage } from '../shared/router/router';
import './fonts.scss';
import './common.scss';

export const root = document.getElementById('root');

export const App = async () => {
    await goToPage('feed');
};
