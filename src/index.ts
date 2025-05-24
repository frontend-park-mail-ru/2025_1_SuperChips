import { App } from './app/app';
import * as VKID from '@vkid/sdk';
import { VKID_APP_ID } from 'shared/config/constants';

await App();

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    try {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        }
    } catch {
        /**/
    }
}

VKID.Config.init({
    app: VKID_APP_ID, // Идентификатор приложения
    redirectUrl: isProd ? 'https://yourflow.ru' : 'https://localhost',
    scope: 'email',
    responseMode: VKID.ConfigResponseMode.Callback,
});
