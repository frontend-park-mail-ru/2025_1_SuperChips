/**
 * Генерирует сайдбар для главных страниц (лента, профиль и тд)
 * @returns {HTMLDivElement}
 */
export const createSidebar = () => {
	const sidebar = document.createElement('div');
	sidebar.classList.add('sidebar');
	sidebar.id = 'sidebar';

	const sidebarButtons = document.createElement('div');
	sidebarButtons.classList.add('sidebar__button-container');
	sidebar.appendChild(sidebarButtons);

	const buttons = [
		{id: 'newPin', source: '/icons/new-pin.svg', alt: 'add new pin'},
		{id: 'chats', source: '/icons/chat.svg', alt: 'chats'},
		{id: 'logout', source: '/icons/log-out.svg', alt: 'logout'}
	];

	buttons.forEach((item) => {
		const button = createSidebarButton(item);
		sidebarButtons.appendChild(button);
	});

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