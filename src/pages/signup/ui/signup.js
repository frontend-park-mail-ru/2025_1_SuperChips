import {renderBackground} from "../../../shared/components/background.js";
import {createInput} from "../../../shared/components/input.js";
import {goToPage} from "../../../shared/router.js";
import {validateSignup} from "../../../shared/validation/signupValidation.js";

/**
 * Генерирует страницу регистрации
 * @returns {HTMLDivElement}
 */
export const renderSignup = () => {
	const page = document.createElement('div');
	page.classList.add('signup-page')
	renderBackground(page);

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
		{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты'},
		{type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято'},
		{type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты'},
		{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов'},
		{type: 'password', id: 'password-confirm', inputLabel: 'Пароль еще раз', errorMessage: 'Пароли не совпадают'},
	];

	inputs.forEach((item) => {
		const input = createInput(item);
		signupForm.appendChild(input);
	});

	const passwordConfirm = signupForm.querySelector('#password-confirm');
	passwordConfirm.addEventListener('change', () => {
		const passwordValue = signupForm.querySelector('#password').value;
		const value = passwordConfirm.value;

		// const container = signupForm.querySelector('#password-confirm-container');
		// const image = container.querySelector('img');
		// const message = container.querySelector('#password-confirm-error');

		if (passwordValue === value) {
			goToPage('feed');
		}
	});

	const submitBtn = document.createElement('button');
	submitBtn.classList.add('button');
	submitBtn.type = 'submit';
	submitBtn.textContent = 'Регистрация';
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

	return page;
}