import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';

interface IPinUpdateProps {
    flow_id: number
    is_private?: boolean,
    description?: string,
    header?: string
}

export const editPin = async (pinID: string) => {
    const titleInput = document.querySelector<HTMLInputElement>('#title');
    const aboutInput = document.querySelector<HTMLTextAreaElement>('#about');
    const privateInput = document.querySelector<HTMLInputElement>('#isPrivate');

    const payload: IPinUpdateProps = { flow_id: Number(pinID) };
    if (privateInput) {
        payload.is_private = privateInput.checked;
    }
    if (titleInput && titleInput?.value !== '') {
        payload.header = titleInput.value;
    }
    if (aboutInput && aboutInput?.value !== '') {
        payload.description = aboutInput.value;
    }

    const response = await API.put('/api/v1/flows', payload);

    if (response instanceof Response && response.ok) {
        Toast('Flow был успешно обновлен', 'success', 5000);
    }
};
