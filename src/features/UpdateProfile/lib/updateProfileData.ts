import type { IProfileSettings } from 'widgets/ProfileSettings';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';
import { Auth } from 'features/authorization';

export const updateProfileData = async (payload: IProfileSettings) => {
    const response = await API.patch('/profile/update', payload);

    if (response instanceof Response && response.ok) {
        Toast('Профиль успешно обновлен', 'message');
        Auth.setUserData(payload);
    }
};
