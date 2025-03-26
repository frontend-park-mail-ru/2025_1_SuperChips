export const togglePasswordHandler = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const container = img.closest('.input') as HTMLDivElement;
    const input = container.querySelector('.input__field') as HTMLInputElement;

    if (input.type === 'password') {
        input.type = 'text';
        img.src = '/public/icons/eye-on.svg';
    } else {
        input.type = 'password';
        img.src = '/public/icons/eye-off.svg';
    }
};
