import { root } from "../app/app.js";
import { renderFeed } from "../pages/feed/ui/feed.js";
import { renderSignup } from "../pages/signup/ui/signup.js";
import { renderLogin } from "../pages/login/ui/login.js";

const config = {
	menu: {
		'feed': {
			href: '/feed',
			title: 'Лента',
			render: renderFeed,
			// authOnly: true,
			// showSidebar: true
		},
		'login': {
			href: '/login',
			title: 'Авторизация',
			render: renderLogin
		},
		'signup': {
			href: '/signup',
			title: 'Регистрация',
			render: renderSignup
		}
	}
};

const appState = {
	activePageLink: null,
};

/**
 * Переходит на указанный URL (прим: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = (page) => {
	root.innerHTML = '';

	appState.activePageLink = page;

	const element = config.menu[page].render();

	history.pushState(config.menu[page].href, '', config.menu[page].href);
	document.title = config.menu[page].title;

	root.appendChild(element);
}
