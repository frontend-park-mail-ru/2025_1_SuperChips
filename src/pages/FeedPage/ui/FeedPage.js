import { Navbar } from '../../../widgets/navbar/navbar';
import { Sidebar } from '../../../widgets/sidebar/sidebar';
import { debouncedScroll } from '../handlers/handleScroll';
import feedTemplate from './FeedPage.hbs';
import './FeedPage.css';

/**
 * Генерирует страницу ленты и создает обработчики событий
 * @returns {HTMLDivElement}
 */
export const FeedPage = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith((await Navbar()));
    page.querySelector('#sidebar').replaceWith(await Sidebar());

    window.addEventListener('scroll', debouncedScroll);

    return page;
};
