import { createSkeletonFeed } from "../lib/skeleton";
import { createNavbar } from "../../../widgets/navbar/navbar.js";
import { createSidebar } from "../../../widgets/sidebar/sidebar.js";
import './feed.css'

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

	const feed = createSkeletonFeed(100);
	feed.classList.add('feed');
	feed.id = 'feed';
	page.appendChild(feed);

	return page;
}