import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';

export const removePinFromBoard = async (pinID: string, boardID: string) => {
    const response = await API.delete(`/boards/${boardID}/flows/${pinID}`);

    if (response instanceof Error) {
        Toast('Ошибка при удалении flow', 'error');
    } else {
        Toast('flow удален', 'message');
        const pin = document.querySelector(`#pin-${pinID}`);
        pin?.remove();
    }

    return response;
};
