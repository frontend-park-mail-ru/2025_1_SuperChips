import { openSharing } from './openSharing';
import { appState } from 'shared/router';

export const closeSharing = (e: Event) => {
    if (!appState.sharing.open) return;

    if (e instanceof KeyboardEvent && e.key !== 'Escape') return;
    if (e.type === 'click') {
        const clickedElement = e.target as HTMLElement;
        const popup = document.querySelector('.sharing-container');

        if (popup?.contains(clickedElement)
            && (!clickedElement.closest('.sharing__close-button'))
            && (!clickedElement.closest('.sharing__button'))
        ) {
            return;
        }
    }
    appState.sharing.open = false;

    document.querySelector('#sharing-container')?.remove();

    const shareButton = document.querySelector('#share');

    shareButton?.removeEventListener('click', closeSharing);
    document.removeEventListener('keydown', closeSharing);
    document.removeEventListener('click', closeSharing);

    shareButton?.addEventListener('click', openSharing);
};
