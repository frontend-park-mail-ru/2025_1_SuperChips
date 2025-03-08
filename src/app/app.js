import {Auth} from '../features/authorization/auth';
import { goToPage } from '../shared/router';
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');

// export const init = async () => {
//     try {
//         const pass = Auth.checkAuthStatus();
//         if (pass) {
//             await goToPage('feed');
//         } else {
//             await goToPage('login');
//         }
//     } catch (error) {
//         await goToPage('login');
//     }
// };

// export const init = () => {
//     goToPage('login');
// };

export const init = () => {
    goToPage('feed');
};