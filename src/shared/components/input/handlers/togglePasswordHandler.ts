export const togglePasswordHandler = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const container = img.closest('.input');
    if (!container) return;

    const input = container.querySelector<HTMLInputElement>('.input__field');
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        img.src = '/public/icons/eye-on.svg';
    } else {
        input.type = 'password';
        img.src = '/public/icons/eye-off.svg';
    }
};
