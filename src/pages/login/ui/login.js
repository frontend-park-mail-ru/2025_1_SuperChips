import {renderBackground} from "../../../shared/components/background.js";
import {createInput} from "../../../shared/components/input.js";
import {validateEmail} from "../../../shared/validation/emailValidation.js";
import {validatePassword} from "../../../shared/validation/passwordValidation.js";
import {goToPage} from "../../../shared/router.js";


/**
 * Генерирует страницу логина
 * @returns {HTMLDivElement}
 */
export const renderLogin = () => {
	const page = document.createElement('div');
	page.classList.add('login-page');
	renderBackground(page);

	const container = document.createElement('div');
	container.classList.add('login-container');
	page.appendChild(container);

	const loginBox = document.createElement('form');
	loginBox.classList.add('login-box-1');
	loginBox.innerHTML += `
    <h1 class="header">Вход</h1>
    <label class="subheader">Добро пожаловать в flow!</label>
    `
	container.appendChild(loginBox);

	const loginForm = document.createElement('form');
	loginForm.classList.add('login-form');
	loginBox.appendChild(loginForm)

	const inputs = [
		{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
		{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Неправильный пароль или почта'}
	];

	inputs.forEach((item) => {
		const input = createInput(item);
		loginForm.appendChild(input);
	})

	const submitBtn = document.createElement('button');
	submitBtn.classList.add('button');
	submitBtn.type = 'submit';
	submitBtn.textContent = 'Вход';
	loginForm.appendChild(submitBtn);

	submitBtn.addEventListener('click', (event) => {
		event.preventDefault();

		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		if (validateEmail(email) && validatePassword(password)) {
			goToPage('feed');
		}
	});

	const redirect = document.createElement('div');
	redirect.classList.add('login-redirect');
	redirect.textContent = 'Еще нет аккаунта?'
	loginForm.appendChild(redirect)

	const redirectBtn = document.createElement('a');
	redirectBtn.classList.add('label', 'bold', 'redirect');
	redirect.appendChild(redirectBtn);
	redirectBtn.text = ' Регистрация';

	redirectBtn.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('signup');
	});

	return page
}