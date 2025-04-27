import type { IPinProps } from '../model/types';
import { PinDropdown } from 'widgets/PinDropdown';
import { navigate } from 'shared/router';
import { savePinToBoard } from '../handlers/savePinToBoard';
import { removePinFromBoard } from '../handlers/removePinFromBoard';
import { Auth } from 'features/authorization';
import { BoardStorage } from 'features/boardLoader';
import './Pin.scss';
import template from './Pin.hbs';
import { PIN_WIDTH, USER_SAVED_PINS_BOARD } from 'shared/config/constants';


export const Pin = (params: IPinProps) => {
    const container = document.createElement('div');

    const config = {
        ...params,
        authorized: !!Auth.userData,
        mutable: params.canDelete || params.canRemove,
        boardToSave: BoardStorage.boardToSave === USER_SAVED_PINS_BOARD ? 'Мои flow' : BoardStorage.boardToSave,
    };

    container.innerHTML = template(config);

    const pin = container.querySelector('.pin') as HTMLDivElement;
    pin.addEventListener('click', () => navigate(`flow/${config.pinID}`));

    if (params.width && params.height) {
        pin.style.width = PIN_WIDTH + 'px';
        pin.style.height = (params.height * PIN_WIDTH) / params.width + 'px';
    }

    const dropdownButton = container.querySelector('.dropdown-block');
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

    const editButton = container.querySelector('.pin__edit-button');
    if (editButton && config.canEdit) {
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            navigate(`flow/edit/${params.pinID}`).finally();
        });
    }

    return pin;
};
