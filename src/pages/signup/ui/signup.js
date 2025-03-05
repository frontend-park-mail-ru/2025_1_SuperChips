import { debouncedInputHandler } from "../../../shared/handlers/inputHandler";
import { validateSignup } from "../lib/signupValidation.js";
import { debounce } from "../../../shared/utils/debounce";
import { goToPage } from "../../../shared/router.js";
import './signup.css'

/**
 * Генерирует страницу регистрации
 * @returns {HTMLDivElement}
 */
// export const renderSignup = () => {
// 	const page = document.createElement('div');
// 	page.classList.add('signup-page')
// 	renderBackground(page);
//
// 	const container = document.createElement('div');
// 	container.classList.add('signup-container');
// 	page.appendChild(container);
//
// 	const signupBox = document.createElement('div');
// 	signupBox.classList.add('signup-box-1');
// 	container.appendChild(signupBox);
//
// 	signupBox.innerHTML += `
//     <h1 class="header">Регистрация</h1>
//     <label class="subheader">Еще пару шагов и Вы с flow!</label>
//     `
//
// 	const signupForm = document.createElement('form');
// 	signupForm.classList.add('signup-form');
// 	signupBox.appendChild(signupForm);
//
//
// 	const inputs = [
// 		{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты', isStarred: true},
// 		{type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято', isStarred: true},
// 		{type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты', isStarred: true},
// 		{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', isStarred: true},
// 		{type: 'password', id: 'passwordConfirm', inputLabel: 'Повторите пароль', errorMessage: 'Пароли не совпадают', isStarred: true},
// 	];
//
// 	inputs.forEach((item) => {
// 		const input = createInput(item);
// 		signupForm.appendChild(input);
// 	});
//
// 	const submitBtn = document.createElement('button');
// 	submitBtn.classList.add('button');
// 	submitBtn.type = 'submit';
// 	submitBtn.textContent = 'Зарегистрироваться';
// 	signupForm.appendChild(submitBtn);
//
// 	const redirect = document.createElement('div');
// 	redirect.classList.add('signup-redirect');
// 	redirect.textContent = 'Уже есть аккаунт?'
// 	signupForm.appendChild(redirect)
//
// 	const redirectBtn = document.createElement('a');
// 	redirectBtn.classList.add('label', 'bold', 'redirect');
// 	redirect.appendChild(redirectBtn);
// 	redirectBtn.text = ' Войти';
//
// 	redirectBtn.addEventListener('click', (event) => {
// 		event.preventDefault();
// 		goToPage('login');
// 	});
//
// 	signupForm.addEventListener('submit', handleSubmit);
// 	signupForm.addEventListener('input', debouncedPasswordHandler);
//
// 	return page;
// }


import Handlebars from 'handlebars';
import inputTemplate from '../../../shared/components/input/input.hbs'
import signupTemplate  from './signup.hbs';

export const renderSignup = () => {
	const inputs = [
		{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты', isStarred: true},
		{type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято', isStarred: true},
		{type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты', isStarred: true},
		{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', isStarred: true},
		{type: 'password', id: 'passwordConfirm', inputLabel: 'Повторите пароль', errorMessage: 'Пароли не совпадают', isStarred: true},
	];

	Handlebars.registerPartial('input', inputTemplate);

	const html = signupTemplate({inputs});

	const page = document.createElement('div');
	page.insertAdjacentHTML('beforeend', html);

	const redirectBtn = page.querySelector('.redirect');
	redirectBtn.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('login');
	});

	const signupForm = page.querySelector('.signup-form');
	signupForm.addEventListener('submit', handleSignup);
	signupForm.addEventListener('input', debouncedInputHandler);
	signupForm.addEventListener('input', debouncedPasswordConfirm);

	return page;
}


const passwordConfirm = (event) => {
	if (event.target.id !== 'password' && event.target.id !== 'passwordConfirm') { return; }

	const signupForm = document.querySelector('.signup-form');
	const password = signupForm.querySelector('#password').value;

	const confirm = signupForm.querySelector('#passwordConfirm').value;
	const message = signupForm.querySelector('#passwordConfirm-error');

	const icon = signupForm.querySelector('#passwordConfirm-error-icon');
	const showError = password !== confirm;
	icon.classList.toggle('hidden', !showError);
	message.classList.toggle('hidden', !showError);
	message.textContent = 'Пароли не совпадают';
}

const debouncedPasswordConfirm = debounce(passwordConfirm, 300);

const handleSignup = (event) => {
	event.preventDefault();

	const form = document.querySelector('.signup-form');

	const inputData = {};
	const inputs = form.querySelectorAll('.input__field');
	inputs.forEach(input => {
		inputData[input.id] = input.value;
	});

	if (validateSignup(inputData)) {
		goToPage('feed');
	}
}
