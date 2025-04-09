import { toggleScroll } from '../lib/toggleScroll';

export const closePopup = (event: MouseEvent | KeyboardEvent) => {
    if (event.type === 'keydown' && (event as KeyboardEvent).key !== 'Escape') return;

    if (event.type === 'click') {
        const popup = document.querySelector('.popup');
        const clickedElement = event.target as HTMLElement;

        if (popup?.contains(clickedElement) && !clickedElement.closest('.popup__close')) {
            return;
        }
    }

    const popup = document.querySelector('.popup');
    const background = document.querySelector<HTMLDivElement>('.black-background');
    const cross = document.querySelector<HTMLImageElement>('.popup__close');

    document.removeEventListener('keydown', closePopup);
    cross?.removeEventListener('click', closePopup);
    background?.removeEventListener('click', closePopup);

    popup?.remove();
    background?.remove();

    toggleScroll('enabled');
};
