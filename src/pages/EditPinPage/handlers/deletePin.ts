import { Toast } from 'shared/components/Toast';
import { closePopup } from 'widgets/BoardPopup';
import { API } from 'shared/api';
import { root } from 'app/app';
import template from '../ui/ConfirmPopup.hbs';

export const deletePin = async (pinID: string) => {
    const popup = document.createElement('div');
    popup.innerHTML = template({});

    popup.querySelector<HTMLButtonElement>('#cancel-button')?.addEventListener('click', cancelDelete);
    popup.querySelector<HTMLButtonElement>('#confirm-button')?.addEventListener('click', () => confirmDelete(pinID));

    setTimeout(() => document.addEventListener('click', closePopup), 100);
    document.addEventListener('keydown', closePopup);
    root.appendChild(popup);
};


const confirmDelete = async (pinID: string) => {
    const response = await API.delete(`/api/v1/flows?id=${pinID}`);
    if (response instanceof Error || !response.ok) {
        Toast('Ошибка при удалении flow', 'error');
        return response;
    }

    Toast('flow удален', 'message');
    document.querySelector(`#pin-${pinID}`)?.remove();
    history.go(-2);
};

const cancelDelete = () => {
    document.querySelector('#popup')?.remove();
    document.removeEventListener('click', cancelDelete);
};

