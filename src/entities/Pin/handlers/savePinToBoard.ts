import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { BoardStorage } from 'features/boardLoader';


export const savePinToBoard = async (pinID: string, boardName?: string) => {
    const closeButton = document.querySelector<HTMLImageElement>('.popup__close');

    const name = boardName || BoardStorage.boardToSave;
    const id = BoardStorage.getIDbyName(name);
    if (!id) {
        Toast('Произошла ошибка при сохранении', 'error');
        return;
    }

    const response = await API.post(`/api/v1/boards/${id}/flows`, { flow_id: Number(pinID) });
    if (response instanceof Response && response.ok) {
        Toast('flow добавлен в вашу коллекцию', 'message');
        closeButton?.click();
    } else if (response instanceof Response && response.status === 500) {
        Toast('Flow уже добавлен на доску', 'message');
        closeButton?.click();
    } else {
        Toast('Произошла ошибка при добавлении на доску', 'error');
        closeButton?.click();
    }
};
