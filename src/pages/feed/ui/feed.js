import { createSkeletonFeed } from '../lib/skeleton';
import { createNavbar } from '../../../widgets/navbar/navbar';
import { createSidebar } from '../../../widgets/sidebar/sidebar';
import './feed.css';
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
    page.appendChild(feed);

    return page;
};