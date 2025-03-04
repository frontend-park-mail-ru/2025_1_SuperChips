import { renderBackground } from "../../../shared/components/background/background.js";
import {createInput} from "../../../shared/components/input/input.js";
import { goToPage } from "../../../shared/router.js";
import { validateSignup } from "../lib/signupValidation.js";
import {pictureBox} from "../../../shared/components/pictureBox/pictureBox.js";
import './signup.css'
/**
 * Генерирует страницу регистрации
 * @returns {HTMLDivElement}
 */
export const renderSignup = () => {
	const page = document.createElement('div');
	page.classList.add('signup-page')
	renderBackground(page);

	const pictures = pictureBox();
	page.innerHTML += pictures;

	const container = document.createElement('div');
	container.classList.add('signup-container');
	page.appendChild(container);

	const signupBox = document.createElement('div');
	signupBox.classList.add('signup-box-1');
	container.appendChild(signupBox);

	signupBox.innerHTML += `
    <h1 class="header">Регистрация</h1>
    <label class="subheader">Еще пару шагов и Вы с flow!</label>
    `

	const signupForm = document.createElement('div');
	signupForm.classList.add('signup-form');
	signupBox.appendChild(signupForm);

	const inputs = [
		{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты', isStarred: true},
		{type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято', isStarred: true},
		{type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты', isStarred: true},
		{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', isStarred: true},
		{type: 'password', id: 'password-confirm', inputLabel: 'Повторите пароль', errorMessage: 'Пароли не совпадают', isStarred: true},
	];

	inputs.forEach((item) => {
		const input = createInput(item);
		signupForm.appendChild(input);
	});

	const submitBtn = document.createElement('button');
	submitBtn.classList.add('button');
	submitBtn.type = 'submit';
	submitBtn.textContent = 'Зарегистрироваться';
	signupForm.appendChild(submitBtn);

	submitBtn.addEventListener('click', (event) => {
		event.preventDefault();

		const inputData = {
			email: document.getElementById('email').value,
			nickname: document.getElementById('nickname').value,
			birthday: document.getElementById('birthday').value,
			password: document.getElementById('password').value,
			passwordConfirm: document.getElementById('password-confirm').value
		};

		for (let key in inputData) {
			console.log(inputData[key]);
		}

		const pass = validateSignup(inputData);
		if (Object.values(pass).every(item => item)) {
			goToPage('feed');
		} else {
			alert('validation not passed')
		}
	});

	const redirect = document.createElement('div');
	redirect.classList.add('signup-redirect');
	redirect.textContent = 'Уже есть аккаунт?'
	signupForm.appendChild(redirect)

	const redirectBtn = document.createElement('a');
	redirectBtn.classList.add('label', 'bold', 'redirect');
	redirect.appendChild(redirectBtn);
	redirectBtn.text = ' Войти';

	redirectBtn.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('login');
	});

	signupForm.addEventListener('change', (event) => {
		if (event.target.id !== 'password' && event.target.id !== 'password-confirm') { return; }

		const password = signupForm.querySelector('#password').value;
		const confirm = signupForm.querySelector('#password-confirm').value;

		const container = signupForm.querySelector('#password-confirm-container');
		const icon = container.querySelector('img');
		const message = signupForm.querySelector('#password-confirm-error');

		if (password !== confirm) {
			icon.classList.remove('hidden');
			message.classList.remove('hidden');
		} else {
			icon.classList.add('hidden');
			message.classList.add('hidden');

		}
	});

	return page;
}
