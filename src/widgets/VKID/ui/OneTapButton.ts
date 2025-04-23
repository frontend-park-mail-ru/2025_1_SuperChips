import { VKIDOnError, VKIDOnSuccess } from '../handlers/VKIDCallback';
import * as VKID from '@vkid/sdk';


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
