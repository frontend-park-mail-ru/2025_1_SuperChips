import type { IPinProps } from '../model/types';
import { PinDropdown } from 'widgets/PinDropdown';
import { appState, navigate } from 'shared/router';
import { savePinToBoard } from '../handlers/savePinToBoard';
import { removePinFromBoard } from '../handlers/removePinFromBoard';
import { getWidthBySelector } from 'shared/utils';
import { Auth } from 'features/authorization';
import { BoardStorage } from 'features/boardLoader';
import { USER_SAVED_PINS_BOARD } from 'shared/config/constants';
import { NSFWPopup } from 'widgets/NSFWPopup';
import './Pin.scss';
import template from './Pin.hbs';


export const Pin = (params: IPinProps) => {
    const container = document.createElement('div');
    const config = {
        ...params,
        authorized: !!Auth.userData,
        mutable: params.canDelete || params.canRemove,
        boardToSave: BoardStorage.boardToSave === USER_SAVED_PINS_BOARD ? 'Мои flow' : BoardStorage.boardToSave,
        mobile: appState.mobile,
    };

    container.innerHTML = template(config);

    const pin = container.querySelector('.pin') as HTMLDivElement;
    // Обработка клика на пин
    pin.addEventListener('click', (event) => {
        // Проверяем, является ли пин NSFW и имеет ли класс nsfw (блюр)
        const pinImage = pin.querySelector('.pin__picture');
        if (config.is_nsfw && pinImage?.classList.contains('nsfw')) {
            event.stopPropagation();
            NSFWPopup(config.pinID);
            return;
        }
        navigate(`flow/${config.pinID}`).finally();
    });


    const pinWidth = getWidthBySelector('.pin');
    if (params.width && params.height) {
        pin.style.width = pinWidth + 'px';
        pin.style.height = (params.height * pinWidth) / params.width + 'px';
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
