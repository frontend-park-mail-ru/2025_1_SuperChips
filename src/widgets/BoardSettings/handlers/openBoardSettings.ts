import { BoardSettings } from '../ui/BoardSettings';
import { root } from 'app/app';
import { toggleScroll } from 'widgets/BoardPopup';

export const openBoardSettings = (isAuthor: boolean = false) => {
    const boardSettings = BoardSettings(isAuthor);
    if (boardSettings) {
        toggleScroll('disabled');
        root.appendChild(boardSettings);
    }
};
