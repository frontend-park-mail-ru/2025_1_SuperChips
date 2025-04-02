import { User } from 'entities/User';
import { Navbar } from 'widgets/navbar';
import { Sidebar } from 'widgets/sidebar';
import { createVertTabBar } from 'pages/SettingsPage/components/vert-tab-bar/vert-tab-bar';
import { createProfileSettings } from './ProfileSettings';
import { createSecuritySettings } from './SecuritySettings';
import './settings.scss';



export const SettingsPage = async () => {
    const page = document.createElement('div');
    page.classList.add('settings-page');

    page.appendChild(await Navbar());
    page.appendChild(await Sidebar());

    const mainContent = document.createElement('div');
    mainContent.classList.add('settings-container');

    const tabs = [
        { id: 'profile', title: 'Профиль', active: true },
        { id: 'security', title: 'Безопасность', active: false }
    ];

    const tabBar = createVertTabBar(tabs, (tabId: string) => {
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
