import {createNavbar} from '../../../widgets/navbar/navbar';
import {createSidebar} from '../../../widgets/sidebar/sidebar';
import {createSkeleton} from '../lib/skeleton';
import {API} from '../../../shared/api/api';
import './feed.css';
import feedTemplate from './feed.hbs';

/**
 * Генерирует страницу ленты
 * @returns {HTMLDivElement}
 */

export const renderFeed = async () => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', feedTemplate({}));

    page.querySelector('#navbar').replaceWith(await createNavbar());
    page.querySelector('#sidebar').replaceWith(createSidebar());

    const feed = page.querySelector('#feed');

    const images = await API.get('/api/v1/feed');
    // images.forEach((item) => {
    //     feed.appendChild(item.image);
    // });


    for (let i = 1; i <= 20; i++) {
        feed.appendChild(createSkeleton(`img/${i}.jpg`));
    }

    return page;
};
