import {goToPage} from '../shared/router';
import './fonts.scss';
import './common.scss';

export const root = document.getElementById('root');


export const init = async () => {
    await goToPage('feed');
};