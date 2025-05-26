import { Sharing } from '../ui/Sharing';
import { closeSharing } from './closeSharing';
import { root } from 'app/app';
import { appState } from 'shared/router';


export const openSharing = () => {
    if (appState.sharing.open) return;
    appState.sharing.open = true;

    root.appendChild(Sharing());

    const shareButton = document.querySelector('#share');

    shareButton?.removeEventListener('click', openSharing);

    setTimeout(() => {
        shareButton?.addEventListener('click', closeSharing);
        document.addEventListener('keydown', closeSharing);
        document.addEventListener('click', closeSharing);
    }, 0);
};
