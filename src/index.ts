import { App } from './app/app';
import * as VKID from '@vkid/sdk';
import { VKID_APP_ID } from 'shared/config/constants';

await App();

try {
    if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    } else {
        console.warn('⚠️ Service Worker not supported in this browser');
    }
} catch {
    console.error('Failed to register a Service Worker');
}

VKID.Config.init({
    app: VKID_APP_ID,
    // redirectUrl: 'https://yourflow.ru',
    redirectUrl: 'https://localhost',
    scope: 'email',
    responseMode: VKID.ConfigResponseMode.Callback,
});
