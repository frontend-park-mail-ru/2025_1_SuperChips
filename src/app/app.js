import { goToPage } from "../shared/router.js";
import './fonts.css';
import './common.css';

export const root = document.getElementById('root');

export const init = () => {
	goToPage('login');
}
