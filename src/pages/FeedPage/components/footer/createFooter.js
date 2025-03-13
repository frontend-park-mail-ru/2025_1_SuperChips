import footerTemplate from './footer.hbs';
import './footer.css';

export const createFooter = () => {
    const footer = document.createElement('div');
    footer.insertAdjacentHTML('beforeend', footerTemplate({}));
    return footer;
};
