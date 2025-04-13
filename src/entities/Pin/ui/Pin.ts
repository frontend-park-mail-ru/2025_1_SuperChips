import type { IPinProps } from '../model/types';
import { PinDropdown } from 'widgets/PinDropdown';
import { navigate } from 'shared/router';
import { savePinToBoard } from '../handlers/savePinToBoard';
import { removePinFromBoard } from '../handlers/removePinFromBoard';
import { Auth } from 'features/authorization';
import './Pin.scss';
import template from './Pin.hbs';


export const Pin = (params: IPinProps) => {
    const container = document.createElement('div');

    const config = {
        ...params,
        authorized: !!Auth.userData,
        showDelete: params.canDelete || params.canRemove,
    };

    container.innerHTML = template(config);

    const dropdownButton = container.querySelector('.pin__dropdown-button');
    dropdownButton?.addEventListener('click', (event) => {
        event.stopPropagation();
        PinDropdown(config.pinID);
    });

    const saveButton = container.querySelector('.pin__save-button');
    saveButton?.addEventListener('click', async (event) => {
        event.stopPropagation();
        savePinToBoard(config.pinID).finally();
    });

    const deleteButton = container.querySelector('.pin__delete-button');
    if (deleteButton && config.canRemove) {
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!config.boardID) return;
            removePinFromBoard(config.pinID, config.boardID).finally();
        });
    }

    const pin = container.querySelector('.pin') as HTMLDivElement;
    pin.addEventListener('click', () => navigate(`flow/${config.pinID}`));

    return pin;
};
