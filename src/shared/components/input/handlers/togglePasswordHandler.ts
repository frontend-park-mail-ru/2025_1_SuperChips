export const togglePasswordHandler = (event: Event) => {
    const img = event.target as HTMLImageElement;
    
    // Check if it's a regular input or transparent input
    const regularContainer = img.closest('.input');
    const transparentContainer = img.closest('.inputTransparent');
    
    let input: HTMLInputElement | null = null;
    
    if (regularContainer) {
        input = regularContainer.querySelector('.input__field') as HTMLInputElement;
    } else if (transparentContainer) {
        input = transparentContainer.querySelector('.inputTransparent__field') as HTMLInputElement;
    }
    
    if (!input) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        img.src = '/public/icons/eye-on.svg';
    } else {
        input.type = 'password';
        img.src = '/public/icons/eye-off.svg';
    }
};
