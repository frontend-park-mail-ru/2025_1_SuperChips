import { closeSharing } from '../handlers/closeSharing';
import { copyLink } from '../handlers/copyLink';
import { appState } from 'shared/router';
import './Sharing.scss';
import template from './Sharing.hbs';


export const Sharing = () => {
    const container = document.createElement('div');
    container.classList.add('sharing-container');
    container.id = 'sharing-container';

    const pinID = appState.sharing.id;

    container.innerHTML = template({ id: pinID });

    container.querySelector('#copy-link')?.addEventListener('click', () => {
        copyLink(`/flow/${pinID}`);
    });

    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;

        if (target.classList.contains('sharing__close-button') ||
            target.classList.contains('sharing__button') ||
            target.id === 'copy-link'
        ) {
            closeSharing(event);
        }
    });

    return container;
};
