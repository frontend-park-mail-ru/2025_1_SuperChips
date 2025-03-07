// import { constants } from "../shared/config/constants";
import { goToPage } from '../shared/router';
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');

// export const init = () => {
// 	try {
// 		const pass = constants.auth.checkAuthStatus();
// 		if (pass) {
// 			goToPage('feed');
// 		} else {
// 			goToPage('login');
// 		}
// 	} catch (error) {
// 		goToPage('login');
// 	}
// }

export const init = () => {
    goToPage('login');
};
