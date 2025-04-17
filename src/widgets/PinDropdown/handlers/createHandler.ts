import { BoardPopup } from 'widgets/BoardPopup';

export const createPinDropdown = (event: Event) => {
    const dropdown = document.querySelector('#popup');
    event.stopPropagation();
    BoardPopup('create', 0, '', true);
    dropdown?.remove();
};
