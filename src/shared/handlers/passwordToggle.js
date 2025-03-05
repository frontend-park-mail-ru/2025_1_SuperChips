export const togglePasswordHandler = (event) => {
	const img = event.target;
	const container = img.closest('.input');
	const input = container.querySelector('.input__field');

	if (input.type === 'password') {
		input.type = 'text';
		img.src = 'icons/eye-on.svg'
	} else {
		input.type = 'password';
		img.src = 'icons/eye-off.svg'
	}
}
