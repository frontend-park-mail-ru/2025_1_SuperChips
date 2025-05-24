import { Toast } from 'shared/components/Toast';


export const sharePin = async (pinID: string) => {
    const shareData = {
        url: `https://yourflow.ru/flow/${pinID}`,
    };

    try {
        await navigator.share(shareData);
    } catch {
        Toast('Произошла ошибка, попроуйте позже', 'error');
    }
};
