import { toggleScroll } from 'widgets/BoardPopup/lib/toggleScroll';
import { root } from 'app/app';
import template from './NSFWPopup.hbs';
import './NSFWPopup.scss';

/**
 * Создает и отображает попап с предупреждением о NSFW контенте
 * @param pinID - ID пина с NSFW контентом
 */
export const NSFWPopup = (pinID: string) => {
    toggleScroll('disabled');

    const popup = document.createElement('div');
    popup.innerHTML = template({});
    root.appendChild(popup);

    const confirmButton = popup.querySelector('#nsfw-confirmation-button');
    const cancelButton = popup.querySelector('#nsfw-cancel-button');
    const closeButton = popup.querySelector('.popup__close');
    const background = popup.querySelector('.black-background');

    const confirmHandler = () => {
        const pin = document.querySelector(`#pin-${pinID} .pin__picture`) as HTMLImageElement;
        if (pin) {
            pin.classList.remove('nsfw');
        }
        closePopup();
    };

    const closePopup = () => {
        toggleScroll('enabled');
        popup.remove();
        document.removeEventListener('keydown', escapeHandler);
    };

    const escapeHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    };

    confirmButton?.addEventListener('click', confirmHandler);
    cancelButton?.addEventListener('click', closePopup);
    closeButton?.addEventListener('click', closePopup);
    background?.addEventListener('click', closePopup);
    document.addEventListener('keydown', escapeHandler);
};