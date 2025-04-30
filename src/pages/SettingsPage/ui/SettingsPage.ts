import { createProfileSettings } from 'widgets/ProfileSettings';
import { createSecuritySettings } from 'widgets/SecuritySettings';
import './settings.scss';
import { TabBar } from 'shared/components/tabBar';
import { appState } from 'shared/router';


export const SettingsPage = async () => {
    const page = document.createElement('div');
    page.classList.add('settings-page');

    const mainContent = document.createElement('div');
    mainContent.classList.add('settings-container');

    const tabs = [
        { id: 'profile', title: 'Профиль', active: true },
        { id: 'security', title: 'Безопасность', active: false }
    ];

    if (!appState.loggedWithVKID) {
        const direction = appState.mobile ? 'horizontal' : 'vertical';
        const tabBar = TabBar(tabs, direction, async (tabId: string) => {
            const contentContainer = mainContent.querySelector('.settings-content-container');
            if (contentContainer) {
                contentContainer.remove();
            }

            const newContentContainer = document.createElement('div');
            newContentContainer.classList.add('settings-content-container');

            if (tabId === 'profile') {
                newContentContainer.appendChild(await createProfileSettings());
            } else if (tabId === 'security') {
                newContentContainer.appendChild(createSecuritySettings());
            }

            mainContent.appendChild(newContentContainer);
        });
        mainContent.appendChild(tabBar);
    }

    const initialContent = document.createElement('div');
    initialContent.classList.add('settings-content-container');
    initialContent.appendChild(await createProfileSettings());
    mainContent.appendChild(initialContent);

    page.appendChild(mainContent);

    return page;
};
