import sidebarTemplate from './sidebar.hbs'
import './sidebar.css'
import {goToPage} from "../../shared/router";

/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 * @returns {HTMLDivElement}
 */
export const createSidebar = () => {
	const sidebar = document.createElement('div');

	const buttons = [
		{id: 'newPin', source: '/icons/new-pin.svg', alt: 'add new pin'},
		{id: 'chats', source: '/icons/chat.svg', alt: 'chats'},
		{id: 'logout', source: '/icons/log-out.svg', alt: 'logout'}
	];

	sidebar.insertAdjacentHTML('beforeend', sidebarTemplate({buttons}));

	const logout = sidebar.querySelector('#logout');
	logout.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('login');
	});

	return sidebar;
}
