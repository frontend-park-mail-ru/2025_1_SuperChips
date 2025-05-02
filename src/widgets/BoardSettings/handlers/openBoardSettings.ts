import { BoardSettings } from '../ui/BoardSettings';
import { root } from 'app/app';
import { toggleScroll } from 'widgets/BoardPopup';

export const openBoardSettings = () => {
    const boardSettings = BoardSettings();
    if (boardSettings) {
        toggleScroll('disabled');
        root.appendChild(boardSettings);
    }
};
