import { PinDropdown } from 'widgets/PinDropdown';
import { Auth } from 'features/authorization';
import { savePinToBoard } from '../handlers/savePinToBoard';
import './Pin.scss';
import template from './Pin.hbs';


export const Pin = (url: string, pinID: string) => {
    const container = document.createElement('div');

    const config = {
        url: url,
        id: pinID,
        authorized: !!Auth.userData,
    };

    container.innerHTML = template(config);

    const dropdownButton = container.querySelector('.pin__dropdown-button');
    dropdownButton?.addEventListener('click', () => PinDropdown(pinID));

    const saveButton = container.querySelector('.pin__save-button');
    saveButton?.addEventListener('click', () => savePinToBoard(pinID));

    return container.firstChild as HTMLDivElement;
};
