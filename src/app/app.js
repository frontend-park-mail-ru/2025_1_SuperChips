import {goToPage} from '../shared/router';
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');


export const init = async () => {
    await goToPage('feed');
};