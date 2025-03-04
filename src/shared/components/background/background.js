import bgTemplate from './bg.hbs'
import './bg.css'
/**
 * Генерирует фон для страницы входа
 * @param page
 */
export const  renderBackground = (page) => {
	const html = bgTemplate({});
	page.insertAdjacentHTML('beforeend' ,html);
}