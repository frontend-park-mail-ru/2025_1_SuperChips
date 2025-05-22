import { NotificationStorage } from 'features/notification';

const readNotifications = new Set();

export const notificationObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const element = entry.target as HTMLElement;
                const id = element.id.split('-');
                if (id.length >= 2) {
                    if (!readNotifications.has(id[1])) {
                        readNotifications.add(id[1]);
                        NotificationStorage.read(id[1]);
                        observer.unobserve(element);
                    }
                }
            }
        }
    }, {
        root: document.querySelector('.notification__new'),
        threshold: 1,
    });
    return observer;
};
