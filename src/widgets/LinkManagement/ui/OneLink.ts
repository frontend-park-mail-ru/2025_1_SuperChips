import type { ILinkProps } from './LinkManagement';
import template from './OneLink.hbs';
import { Toast } from 'shared/components/Toast';
import { API } from 'shared/api';

export const OneLink = (props: ILinkProps) => {
    const container = document.createElement('div');
    container.innerHTML = template({ ...props, noLimit: !props.usage_limit && !props.time_limit });

    const element = container.firstChild as HTMLElement;

    const linkField = element.querySelector<HTMLDivElement>('.invite-popup__link-input');
    linkField?.addEventListener('click', () => {
        const link = linkField ? linkField.textContent : null;
        if (link) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    Toast('Ссылка скопирована', 'success');
                })
                .catch(() => {
                    Toast('Не удалось скопировать ссылку', 'error');
                });
        }
    });

    element.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('invitation-link__delete-button')) return;


        const response = await API.delete(`/boards/${props.boardID}/invites/${props.id}`);

        if (!(response instanceof Response && response.ok)) {
            Toast('Ошибка при удалении ссылки');
            return;
        } else if (response instanceof Response && response.ok) {
            Toast('Ссылка успешно удалена', 'success');
            target.closest('.invitation-link')?.remove();
            if (document.querySelectorAll('.invitation-link').length === 0) {
                const popup = document.querySelector('#popup');
                popup?.insertAdjacentHTML('beforeend', '<div>У вас нет активных приглашений</div>');
            }
            return;
        }
    });

    return element;
};
