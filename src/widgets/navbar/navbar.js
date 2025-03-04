import './navbar.css'
import navbarTemplate from './navbar.hbs'

/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * @returns {HTMLDivElement}
 */
export const createNavbar = () => {
	const navbar = document.createElement('div');
	navbar.insertAdjacentHTML('beforeend', navbarTemplate({}));
	return navbar
}
