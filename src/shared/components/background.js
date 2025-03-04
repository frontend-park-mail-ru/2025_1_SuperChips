/**
 * Генерирует фон для страницы входа
 * @param page
 */
export const  renderBackground = (page) => {
	const logo = document.createElement('img');
	logo.src = '/img/logo.png';
	logo.classList.add('login-page__logo');
	logo.alt = 'site logo';

	const backgroundVector = document.createElement('img');
	backgroundVector.src = '/img/line-1.png';
	backgroundVector.classList.add('background-vector');
	backgroundVector.ariaHidden = 'true';

	page.appendChild(logo);
	page.appendChild(backgroundVector);
}