import { goToPage } from "../shared/router.js";
export const root = document.getElementById('root');

export const init = () => {
	goToPage('login');
}
