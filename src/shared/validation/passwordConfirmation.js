export const validatePasswordConfirm = (confirm) => {
	const password = document.querySelector('#password').value;

	if (password !== confirm) {
		return [false, 'Пароли не совпадают'];
	}
	return [true, ''];
}
