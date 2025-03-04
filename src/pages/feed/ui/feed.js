import { createNavbar } from "../../../shared/components/navbar.js";
import { createSidebar } from "../../../shared/components/sidebar.js";
import { goToPage } from "../../../shared/router.js";


/**
 * Генерирует страницу ленты
 * @returns {HTMLDivElement}
 */
export const renderFeed = () => {
	const page = document.createElement('div');
	page.classList.add('main-page');

	const navbar = createNavbar();
	page.appendChild(navbar);

	const sidebar = createSidebar();
	page.appendChild(sidebar);

	const feed = document.createElement('div');
	feed.classList.add('feed');
	feed.id = 'masonry-container';
	page.appendChild(feed);

	const logout = page.querySelector('#logout');
	logout.addEventListener('click', (event) => {
		event.preventDefault();

		goToPage('login');
	});


	const classes = ['skeleton-1', 'skeleton-2', 'skeleton-3'];
	function randInt(min, max) {
		return Math.floor(Math.random() * (max-min+1))
	}

	for (let i=0; i<100; i++) {
		const elem = document.createElement('div');
		const rand = classes[randInt(0, classes.length - 1)];
		elem.classList.add(rand);

		feed.appendChild(elem);
	}

	return page;
}