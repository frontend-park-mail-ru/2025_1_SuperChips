export const togglePasswordHandler = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const container = img.closest('.input') || img.closest('.inputTransparent');
    if (!container) return;

    // Проверяем, какой тип контейнера у нас
    const isTransparent = container.classList.contains('inputTransparent');
    const input = container.querySelector<HTMLInputElement>(isTransparent ? '.inputTransparent__field' : '.input__field');
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        img.src = '/public/icons/eye-on.svg';
    } else {
        input.type = 'password';
        img.src = '/public/icons/eye-off.svg';
    }
};
