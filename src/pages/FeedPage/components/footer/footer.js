import footerTemplate from './footer.hbs';
import './footer.scss';

export const Footer = () => {
    const footer = document.createElement('div');
    footer.insertAdjacentHTML('beforeend', footerTemplate({}));
    return footer;
};
