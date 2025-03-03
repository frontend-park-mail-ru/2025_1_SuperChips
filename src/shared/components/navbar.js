/**
 * Генерирует навбар для основных страниц (ленты, профиля и тд)
 * @returns {HTMLDivElement}
 */
export const createNavbar = () => {
	const navbar = document.createElement('div');
	navbar.classList.add('navbar');
	navbar.innerHTML += `
    <img src="/icons/logo-small.svg" class="navbar-logo" alt="site logo">
    <input type='text' class='search-form' placeholder='Text for search...' id='search'>
    <img src="/img/pfp1.jpg" class="profile-picture" alt="profile picture">
    `;

	return navbar
}