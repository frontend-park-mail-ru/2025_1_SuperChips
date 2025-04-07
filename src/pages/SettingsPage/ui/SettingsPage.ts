import { createProfileSettings } from './ProfileSettings/ProfileSettings';
import { createSecuritySettings } from './SecuritySettings/SecuritySettings';
import './settings.scss';
import { TabBar } from 'shared/components/tabBar';


export const SettingsPage = async () => {
    const page = document.createElement('div');
    page.classList.add('settings-page');

    const mainContent = document.createElement('div');
    mainContent.classList.add('settings-container');

    const tabs = [
        { id: 'profile', title: 'Профиль', active: true },
        { id: 'security', title: 'Безопасность', active: false }
    ];

    const tabBar = TabBar(tabs, 'vertical', (tabId: string) => {
        const contentContainer = mainContent.querySelector('.settings-content-container');
        if (contentContainer) {
            contentContainer.remove();
        }

        const newContentContainer = document.createElement('div');
        newContentContainer.classList.add('settings-content-container');

        if (tabId === 'profile') {
            newContentContainer.appendChild(createProfileSettings());
        } else if (tabId === 'security') {
            newContentContainer.appendChild(createSecuritySettings());
        }

        mainContent.appendChild(newContentContainer);
    });

    mainContent.appendChild(tabBar);

    const initialContent = document.createElement('div');
    initialContent.classList.add('settings-content-container');
    initialContent.appendChild(createProfileSettings());
    mainContent.appendChild(initialContent);

    page.appendChild(mainContent);

    return page;
};