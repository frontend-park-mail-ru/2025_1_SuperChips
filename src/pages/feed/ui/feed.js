import {createNavbar} from '../../../widgets/navbar/navbar';
import {createSidebar} from '../../../widgets/sidebar/sidebar';
import {debouncedScroll} from '../lib/handleScroll';
import feedTemplate from './feed.hbs';
import './feed.css';

/**
 * Генерирует страницу ленты
 * @returns {HTMLDivElement}
 */
export const renderFeed = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith((await createNavbar()));
    page.querySelector('#sidebar').replaceWith(await createSidebar());

    window.addEventListener('scroll', debouncedScroll);

    return page;
};
