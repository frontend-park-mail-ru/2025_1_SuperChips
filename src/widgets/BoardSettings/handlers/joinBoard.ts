import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';
import { navigate } from 'shared/router';

export const joinBoard = async (link: string) => {
    try {
        const response = await API.post(`/join/${link}`);
        
        if (!(response instanceof Response)) {
            Toast('Ошибка при присоединении к доске', 'error');
            return;
        }
        
        if (response.ok) {
            Toast('Вы успешно присоединились к доске', 'success');
            // Перенаправляем на страницу доски
            const data = await response.json();
            if (data?.data?.board_id) {
                navigate(`/board/${data.data.board_id}`, true);
            }
        } else if (response.status === 409) {
            Toast('Вы уже являетесь соавтором этой доски', 'message');
        } else if (response.status === 410) {
            Toast('Срок действия ссылки истек', 'error');
        } else {
            Toast('Ошибка при присоединении к доске', 'error');
        }
    } catch (error) {
        Toast('Ошибка при присоединении к доске', 'error');
    }
}; 