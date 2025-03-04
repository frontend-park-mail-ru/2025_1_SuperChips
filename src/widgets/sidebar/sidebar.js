import sidebarTemplate from './sidebar.hbs'
import './sidebar.css'

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
	return sidebar;
}

function createSidebarButton({id, source, alt}) {
	const button = document.createElement('a');
	button.id = id;
	button.classList.add('sidebar-button');

	const image = document.createElement('img');
	image.src = source;
	image.alt = alt;

	button.appendChild(image);

	return button;
}