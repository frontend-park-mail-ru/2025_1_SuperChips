import { Auth } from 'features/authorization';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { BoardStorage } from 'features/boardLoader';

export const pinDropdownTabBarHandler = async (tabID: string) => {
    if (!Auth.userData) return;

    BoardStorage.boardToSave = (tabID === '0')
        ? USER_SAVED_PINS_BOARD
        : BoardStorage.ownBoardList[Number(tabID) - 1].name;


    const dropdown = document.querySelector('#popup');
    dropdown?.remove();

    const labels = document.querySelectorAll('.pin__dropdown-board');
    const boardToSave = BoardStorage.boardToSave;
    const newName = tabID === '0' ? 'Мои flow' : boardToSave;
    labels.forEach((label) => {
        label.textContent = newName;
    });
};
