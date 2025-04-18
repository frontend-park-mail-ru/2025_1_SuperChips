import { appState } from 'shared/router';
import './Toast.scss';

type TToastType = 'error' | 'success' | 'message';

export const Toast = (
    message: string,
    type: TToastType = 'error',
    duration: number = 3000,
    className: string | null = null,
): void => {
    if (appState.isShowingToast) return;
    appState.isShowingToast = true;

    const toast = document.createElement('div');
    toast.className = `toast-${type}`;
    if (className) {
        toast.classList.add(className);
    }

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
