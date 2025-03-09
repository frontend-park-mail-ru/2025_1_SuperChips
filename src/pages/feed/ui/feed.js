import {createNavbar} from '../../../widgets/navbar/navbar';
import {createSidebar} from '../../../widgets/sidebar/sidebar';
import './feed.css';
import feedTemplate from './feed.hbs';
import {loadImages} from '../lib/loadImages';
import {debouncedScroll} from '../lib/handleScroll';

/**
 * Генерирует страницу ленты
 * @returns {HTMLDivElement}
 */
export const renderFeed = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith((await createNavbar()));
    page.querySelector('#sidebar').replaceWith(await createSidebar());

    const feed = page.querySelector('#feed');
    const newFrame = await loadImages();
    feed.innerHTML = newFrame.innerHTML;

    window.addEventListener('scroll', debouncedScroll);

    return page;
};
