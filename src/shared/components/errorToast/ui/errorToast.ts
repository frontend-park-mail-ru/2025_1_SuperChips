import './errorToast.scss';
import { appState } from 'shared/router';

export const ErrorToast = (message: string, duration: number = 3000): void => {
    if (appState.isShowingToast) return;
    appState.isShowingToast = true;

    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
            appState.isShowingToast = false;
        }, 300);
    }, duration);
};

