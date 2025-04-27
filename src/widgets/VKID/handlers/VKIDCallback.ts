import { Auth } from 'features/authorization';
import { Toast } from 'shared/components/Toast';
import { VKIDPopup } from '../ui/VKIDPopup';
import * as VKID from '@vkid/sdk';


export const VKIDOnSuccess = async (data: Omit<VKID.TokenResult, 'id_token'>) => {
    if (data && data.access_token) {
        const accessToken = data.access_token;

        const body = {
            access_token: accessToken,
        };

        const response = await Auth.VKIDLogin(body);
        if (response instanceof Response && response.status === 404) {
            VKIDPopup(data.access_token);
        } else if (!(response instanceof Response && response.ok)) {
            Toast('Ошибка при авторизации, попробуйте немного позже', 'error', 5000);
        }
    }
};


export const VKIDOnError = () => {
    Toast('Ошибка при авторизации, попробуйте немного позже', 'error', 5000);
};
