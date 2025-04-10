export const dateHandler = (event: Event) => {
    const input = event.target as HTMLInputElement | null;

    if (!input) return;

    const value = input.value;
    
    // Check for DD.MM.YYYY format
    if (value.includes('.')) {
        const errorMessage = input.parentElement?.querySelector('.input__error');
        const errorIcon = input.parentElement?.querySelector('.input__error-icon');
        
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            if (errorMessage) {
                errorMessage.textContent = 'Введите дату в формате ДД.ММ.ГГГГ';
                errorMessage.classList.remove('hidden');
            }
            if (errorIcon) {
                errorIcon.classList.remove('hidden');
            }
            return;
        }
        
        // Clear errors if format is correct
        if (errorMessage) errorMessage.classList.add('hidden');
        if (errorIcon) errorIcon.classList.add('hidden');
        return;
    }

    // Original handling for YYYY-MM-DD format
    const parts = value.split('-');
    if (parts.length < 3) return;
    parts[0] = parts[0].slice(0, 4);
    input.value = parts.join('-');
};
