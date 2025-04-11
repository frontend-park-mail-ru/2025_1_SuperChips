import { savePinToBoard } from 'entities/Pin';
import { Auth } from 'features/authorization';

export const handleTabBar = async (tabID: string, pinID: string) => {
    if (!Auth.userData) return;

    if (tabID === '0') {
        await savePinToBoard(pinID);
        return;
    } else {
        const data = sessionStorage.getItem('boardNames');
        if (!data) return;

        const boardNames = JSON.parse(data);
        const name = boardNames[Number(tabID) - 1];      // -1 из-за того, что первая вкладка - Мои flow

        await savePinToBoard(pinID, name);
        return;
    }
};
