import { root } from "../index.js";
import { renderFeed } from "../pages/feed/ui/feed.js";
import { renderSignup } from "../pages/signup/ui/signup.js";
import { renderLogin } from "../pages/login/ui/login.js";

const config = {
	menu: {
		'feed': {
			href: '/feed',
			title: 'Лента',
			render: renderFeed,
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
 * Переходит на указанный URL (ex: 'feed', 'login')
 * @param {string} page
 */
export const goToPage = (page) => {
	root.innerHTML = '';

	appState.activePageLink = page;

	const element = config.menu[page].render();

	history.pushState(config.menu[page].href, '', config.menu[page].href);
	document.title = config.menu[page].title;

	root.appendChild(element);
	if (page === 'feed') {
		const container = element.querySelector('#masonry-container');
		const msn = new Masonry(container, {
			itemSelector: '.skeleton-1, .skeleton-2, .skeleton-3',
			columnWidth: '.skeleton-1',
			percentPosition: true,
			gutter: 32,
			transitionDuration: '0.3s'
		});
		root.addEventListener('DOMContentLoaded', () => {msn});
	}
}