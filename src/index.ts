import { App } from './app/app';
import * as VKID from '@vkid/sdk';

await App();

// TODO убрать комменты на проде
// try {
//     if ('serviceWorker' in navigator) {
//         await navigator.serviceWorker.register('/sw.js', { scope: '/' });
//     } else {
//         console.warn('⚠️ Service Worker not supported in this browser');
//     }
// } catch (error) {
//     console.error('Failed to register a Service Worker');
// }

VKID.Config.init({
    app: 53441005, // Идентификатор приложения
    redirectUrl: 'https://localhost',
    scope: 'email',
});
