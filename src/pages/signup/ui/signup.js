import { validateSignup } from "../lib/signupValidation.js";
import { createInput } from "../../../shared/components/input/input";
import { debounce } from "../../../shared/utils/debounce";
import { goToPage } from "../../../shared/router.js";
import signupTemplate  from '../../../shared/components/authPage/authPage.hbs';
import '../../../shared/components/input/input.css';
import '../../../shared/components/authPage/authPage.css';
import './signup.css'


/**
 * Генерирует страницу регистрации
 * @returns {HTMLDivElement}
 */
export const renderSignup = () => {
	const config = {
		page: 'signup',
		redirectText: 'есть аккаунт?',
		redirectBtn: 'Войти',
		submitBtn: 'Зарегистрироваться',
		header: 'Регистрация',
		subheader: 'Еще пару шагов и Вы с flow!',
		inputs: [
			{type: 'email', id: 'email', inputLabel: 'Email', errorMessage: 'Неправильный формат почты', isStarred: true},
			{type: 'text', id: 'nickname', inputLabel: 'Имя пользователя', errorMessage: 'Это имя уже занято', isStarred: true},
			{type: 'date', id: 'birthday', inputLabel: 'Дата рождения', errorMessage: 'Неправильный формат даты', isStarred: true},
			{type: 'password', id: 'password', inputLabel: 'Пароль', errorMessage: 'Пароль должен быть длиной не менее 8 символов', isStarred: true, isPassword: true},
			{type: 'password', id: 'passwordConfirm', inputLabel: 'Повторите пароль', errorMessage: 'Пароли не совпадают', isStarred: true,  isPassword: true},
		]
	}

	const html = signupTemplate(config);
	const page = document.createElement('div');
	page.insertAdjacentHTML('beforeend', html);

	const redirectBtn = page.querySelector('.redirect');
	redirectBtn.addEventListener('click', (event) => {
		event.preventDefault();
		goToPage('login');
	});

	const form = page.querySelector('.signup-form');
	const placeholders = form.querySelectorAll('.input-placeholder');
	placeholders.forEach((item, index) => {
		item.replaceWith(createInput(config.inputs[index]));
	});

	form.addEventListener('submit', signupHandler);
	form.addEventListener('change', buttonHandler);
	form.addEventListener('input', debouncedPasswordConfirm);

	return page;
}


const passwordConfirm = (event) => {
	if (event.target.id !== 'password' && event.target.id !== 'passwordConfirm') { return; }

	const password = document.querySelector('#password').value;

	const confirm = document.querySelector('#passwordConfirm').value;
	const message = document.querySelector('#passwordConfirm-error');

	const icon = document.querySelector('#passwordConfirm-error-icon');
	const showError = password !== confirm;
	icon.classList.toggle('hidden', !showError);
	message.classList.toggle('hidden', !showError);
	message.textContent = 'Пароли не совпадают';

	const eye = document.querySelector('#passwordConfirm-eye');
	if (showError) {
		eye.style.right = '36px';
	} else {
		eye.style.right = '12px';
	}
}

const debouncedPasswordConfirm = debounce(passwordConfirm, 300);

const signupHandler = (event) => {
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

const buttonHandler = () => {
	const form = document.querySelector('.signup-form');

	const inputData = {};
	const inputs = form.querySelectorAll('.input__field');
	inputs.forEach(input => {
		inputData[input.id] = input.value;
	});

	const button = document.querySelector('.button');
	if (validateSignup(inputData)) {
		button.style.opacity = '100%';
	} else {
		button.style.opacity = '25%'
	}
}
