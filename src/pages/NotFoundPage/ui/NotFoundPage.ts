import notFoundTemplate from './NotFoundPage.hbs';
import './not-found.scss';

/**
 * Генерирует страницу 404 (Not Found)
 */
export const NotFoundPage = async (): Promise<HTMLDivElement> => {
    const page = document.createElement('div');
    page.insertAdjacentHTML('beforeend', notFoundTemplate({}));

    return page;
};
