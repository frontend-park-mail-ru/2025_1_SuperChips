import type { IBoardProps } from 'entities/Board';
import { API } from 'shared/api';
import { Toast } from 'shared/components/Toast';

export const savePinToBoard = async (pinID: string, boardName?: string) => {
    const closeButton = document.querySelector<HTMLImageElement>('.popup__close');

    if (!boardName) {
        // пока нет ручки для сохранения пина в свою коллекцию
        Toast('flow добавлен в вашу коллекцию', 'message');
        closeButton?.click();
        return;
    } else {
        const data = sessionStorage.getItem('boardList');
        if (!data) return;
        const boardList = JSON.parse(data);

        const board = boardList.find((item: IBoardProps) => item.name === boardName);
        if (!board) return;
        const response = await API.post(`/api/v1/${board.id}/flow`, { flow_id: Number(pinID) });

        if (response instanceof Response && response.ok) {
            Toast(`flow добавлен на доску ${board.name}`, 'message');
            closeButton?.click();
        }
    }
};
