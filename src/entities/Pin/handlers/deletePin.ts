import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';

export const deletePin = async (pinID: string) => {
    const response = await API.delete(`/api/v1/flows?id=${pinID}`);
    if (response instanceof Error || !response.ok) {
        Toast('Ошибка при удалении flow', 'error');
        return response;
    }

    Toast('flow удален', 'message');
    const pin = document.querySelector(`#pin-${pinID}`);
    pin?.remove();
};
