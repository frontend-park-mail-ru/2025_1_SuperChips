import { Toast } from 'shared/components/Toast';
import { DOMAIN } from 'shared/config/constants';

export const copyLink = (link: string) => {
    const URL = DOMAIN + link;
    navigator.clipboard.writeText(URL).finally();
    Toast('Ссылка скопирована', 'message');
};
