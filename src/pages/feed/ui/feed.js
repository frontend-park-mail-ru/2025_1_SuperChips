import {createNavbar} from '../../../widgets/navbar/navbar';
import {createSidebar} from '../../../widgets/sidebar/sidebar';
import {createSkeleton} from '../lib/skeleton/skeleton';
import {API} from '../../../shared/api/api';
import './feed.css';
import feedTemplate from './feed.hbs';
// import {loadImages} from '../lib/loadImages';
// import {debouncedScroll, scrollHandler} from '../lib/handleScroll';

/**
 * Генерирует страницу ленты
 * @returns {HTMLDivElement}
 */

let pageNum = 1;

export const renderFeed = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith(await createNavbar());
    page.querySelector('#sidebar').replaceWith(await createSidebar());

    const feed = page.querySelector('#feed');

    const response = await API.get(`/api/v1/feed?page${pageNum++}`);
    const images = JSON.parse(await response.text());
    images.data.forEach(item => {
        feed.appendChild(createSkeleton(item.image));
    });

    return page;
};
