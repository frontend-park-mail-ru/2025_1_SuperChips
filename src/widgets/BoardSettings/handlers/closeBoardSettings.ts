import { toggleScroll } from 'widgets/BoardPopup';

export const closeBoardSettings = () => {
    const settings = document.querySelector<HTMLElement>('#board-settings');
    const container = document.querySelector<HTMLElement>('.board-settings-container');

    if (container) {
        container.style.animation = 'FadeOutHorizontalRight ease-out 0.3s';
    }
    setTimeout(() => {
        settings?.remove();
        toggleScroll('enabled');
    }, 300);
};
