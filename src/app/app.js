import { goToPage } from "../shared/router";
import { Auth } from "../features/authorization/auth";
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');

// export const init = () => {
// 	const auth = new Auth();
// 	try {
// 		const pass = auth.checkAuthStatus();
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
}
