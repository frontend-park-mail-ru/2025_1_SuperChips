import {createNavbar} from '../../../widgets/navbar/navbar';
import {createSidebar} from '../../../widgets/sidebar/sidebar';
import {debouncedScroll} from '../handlers/handleScroll';
import feedTemplate from './FeedPage.hbs';
import './FeedPage.css';

/**
 * Генерирует страницу ленты и создает обработчики событий
 * @returns {HTMLDivElement}
 */
export const FeedPage = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith((await createNavbar()));
    page.querySelector('#sidebar').replaceWith(await createSidebar());

    window.addEventListener('scroll', debouncedScroll);

    return page;
};
