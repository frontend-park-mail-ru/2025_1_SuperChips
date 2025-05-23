import { Toast } from 'shared/components/Toast';


export const sharePin = async (pinID: string) => {
    const shareData = {
        title: 'Flow',
        text: 'Найди свою волну с Flow!',
        url: `https://yourflow/${pinID}`,
    };

    try {
        await navigator.share(shareData);
    } catch {
        Toast('Произошла ошибка, попроуйте позже', 'error');
    }
};
