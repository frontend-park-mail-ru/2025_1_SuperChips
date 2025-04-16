import type { IPinProps } from '../model/types';
import { PinDropdown } from 'widgets/PinDropdown';
import { deletePin } from '../handlers/deletePin';
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
        mutable: params.canDelete || params.canRemove,
        boardToSave: sessionStorage.getItem('boardToSave') || 'Мои flow',
    };

    container.innerHTML = template(config);

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
    } else if (deleteButton && config.canDelete) {
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deletePin(config.pinID).finally();
        });
    }

    const editButton = container.querySelector('.pin__edit-button');
    if (editButton && config.canDelete) {
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            navigate(`flow/edit/${params.pinID}`).finally();
        });
    }


    const pin = container.querySelector('.pin') as HTMLDivElement;
    pin.addEventListener('click', () => navigate(`flow/${config.pinID}`));

    return pin;
};
