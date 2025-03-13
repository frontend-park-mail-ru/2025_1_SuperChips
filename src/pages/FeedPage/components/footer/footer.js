import footerTemplate from './footer.hbs';
import './footer.css';

export const Footer = () => {
    const footer = document.createElement('div');
    footer.insertAdjacentHTML('beforeend', footerTemplate({}));
    return footer;
};
