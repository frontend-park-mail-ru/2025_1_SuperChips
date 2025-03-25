/**
 * Создает и показывает тост с сообщением
 * @param {string} message - текст сообщения
 * @param {string} type - тип сообщения ('success' или 'error')
 */
export const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast_${type}`);
    toast.textContent = message;

    document.body.appendChild(toast);

    // Анимация появления
    setTimeout(() => {
        toast.classList.add('toast_visible');
    }, 100);

    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
        toast.classList.remove('toast_visible');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};
