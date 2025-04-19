import { App } from './app/app';

await App();


try {
    if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    } else {
        console.warn('⚠️ Service Worker not supported in this browser');
    }
} catch {
}
