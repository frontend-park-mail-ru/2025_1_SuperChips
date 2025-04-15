import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';
import { handleClickOutside } from 'shared/handlers/handleClickOutside';

export const deletePin = async (pinID: string) => {
    const button = document.querySelector<HTMLDivElement>('.delete-pin-button')
        || document.querySelector<HTMLDivElement>('.delete-pin-button_confirm');
    if (!button) return;

    if (button.classList.contains('delete-pin-button')) {
        button.classList.replace('delete-pin-button', 'delete-pin-button_confirm');
        setTimeout(() => {
            window.addEventListener(
                'click',
                handleClickOutside(button,
                    'delete-pin-button_confirm',
                    'delete-pin-button',
                    'asd'
                ),
                { once: true }
            );
        },
        100
        );
    } else {
        const response = await API.delete(`/api/v1/flows?id=${pinID}`);
        if (response instanceof Error || !response.ok) {
            Toast('Ошибка при удалении flow', 'error');
            return response;
        }

        Toast('flow удален', 'message');
        document.querySelector(`#pin-${pinID}`)?.remove();
        history.go(-2);
    }
};


