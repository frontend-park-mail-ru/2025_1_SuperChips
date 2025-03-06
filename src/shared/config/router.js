import {renderFeed} from "../../pages/feed/ui/feed";
import {renderLogin} from "../../pages/login/ui/login";
import {renderSignup} from "../../pages/signup/ui/signup";

export const config = {
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