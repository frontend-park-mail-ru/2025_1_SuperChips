import { goToPage } from "../../../shared/router";
import { validateUser } from '../lib/validateUser';
import { togglePasswordHandler } from "../../../shared/handlers/passwordToggle";
import loginTemplate from './authPage.hbs';
import '../../../shared/components/input/input.css';
import './login.css';
import {debouncedInputHandler} from "../../../shared/handlers/inputHandler";

/**
 * Генерирует страницу логина
 * @returns {HTMLDivElement}
 */
export const renderLogin = () => {
	const page = document.createElement('div');

	const config = {
		inputs: [
			{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
			{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Неправильный пароль или почта', isPassword: true}
		],
		page: 'login',
		redirectText: 'Еще нет аккаунта?',
		redirectBtn: 'Регистрация',
		submitBtn: 'Вход',
		header: 'Вход',
		subheader: 'Добро пожаловать в flow!'
	};

	const html = loginTemplate(config);
	page.insertAdjacentHTML('beforeend', html);

	const form = page.querySelector('.login-form');
	form.addEventListener('submit', handleSubmit);
	form.addEventListener('input', debouncedInputHandler);
	form.addEventListener('change', buttonHandler);

	const eye = form.querySelector('.input__toggle-password');
	eye.addEventListener('click', togglePasswordHandler);

	const redirectBtn = page.querySelector('.redirect');
	redirectBtn.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('signup');
	});

	return page;
}


const handleSubmit = (event) => {
	const inputData = {};
	const inputs = event.target.querySelectorAll('.input__field');
	inputs.forEach(input => {
		inputData[input.id] = input.value;
	});

	switch (validateUser(inputData)) {
		case '200':
			goToPage('feed');
			break;
		case '403':
			alert('Неправильный пароль');
			break;
		case '404':
			alert('Такого пользователя не существует');
			break;
	}

}

const buttonHandler = () => {
	if (validateUser()) {
		const button = document.querySelector('.button');
		button.style.opacity = '100%';
	}
}

