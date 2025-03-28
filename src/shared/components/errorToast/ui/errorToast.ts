import './errorToast.scss';

export const ErrorToast = (message: string, duration: number = 3000): void => {
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

