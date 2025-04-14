import { Auth } from 'features/authorization';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';

export const handleTabBar = async (tabID: string) => {
    if (!Auth.userData) return;

    if (tabID === '0') {
        sessionStorage.setItem('boardToSave', USER_SAVED_PINS_BOARD);

    } else {
        const data = sessionStorage.getItem('boardNames');
        if (!data) return;

        const boardNames = JSON.parse(data);

        sessionStorage.setItem('boardToSave', boardNames[Number(tabID) - 1]);// -1 из-за того, что первая вкладка - Мои flow
    }

    const dropdown = document.querySelector('#popup');
    dropdown?.remove();

    const labels = document.querySelectorAll('.pin__dropdown-board');
    const boardToSave = sessionStorage.getItem('boardToSave');
    const newName = tabID === '0' ? 'Мои flow' : boardToSave;
    labels.forEach((label) => {
        label.textContent = newName;
    });
};
