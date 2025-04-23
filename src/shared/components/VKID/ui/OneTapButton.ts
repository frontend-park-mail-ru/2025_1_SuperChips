import * as VKID from '@vkid/sdk';
import { API } from 'shared/api';
import { navigate } from 'shared/router';
import { Toast } from '../../Toast';
import { VKIDPopup } from './VKIDPopup';

export const OneTapButtonObserver = () => {
    const VKIDObserver = new MutationObserver(() => {
        const container = document.querySelector<HTMLElement>('#VkIdSdkOneTap');
        if (container) {
            const oneTap = new VKID.OneTap();
            oneTap.render({
                container: container,
                scheme: VKID.Scheme.DARK,
                styles: { borderRadius: 20 },
            })
                .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, (payload: VKID.AuthResponse) => {
                    const code = payload.code;
                    const deviceId = payload.device_id;

                    VKID.Auth.exchangeCode(code, deviceId)
                        .then(VKIDOnSuccess)
                        .catch(VKIDOnError);
                });
        }
        VKIDObserver.disconnect();
    });

    return VKIDObserver;
};


const VKIDOnSuccess = async (data: Omit<VKID.TokenResult, 'id_token'>) => {
    if (data && data.access_token) {
        const accessToken = data.access_token;
        const userData = await VKID.Auth.userInfo(accessToken);

        const body = {
            // external_id: Number(userData.user.user_id),
            // email: userData.user.email
            access_token: accessToken,
        };
        const login = await API.post('/api/v1/auth/external/login', body);

        if (login instanceof Response && login.ok) {
            navigate('feed').finally();
        } else if (login instanceof Response && login.status === 404) {
            if (userData.user.user_id && userData.user.email) {
                VKIDPopup(accessToken);
            }
        } else {
            Toast('Ошибка при авторизации, попробуйте немного позже', 'error', 5000);
        }
    }
};


const VKIDOnError = () => {
    Toast('Ошибка при авторизации, попробуйте немного позже', 'error', 5000);
};
