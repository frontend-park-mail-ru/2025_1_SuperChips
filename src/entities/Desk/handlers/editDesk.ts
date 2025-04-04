import { DeskPopup } from '../components/popup/DeskPopup';

export const editDesk = async (event: Event) => {
    const icon = event.target as HTMLImageElement;
    const name = icon.id.slice(5);


    // Когда будет готова ручка для изменения досок, сюда добавится логика


    DeskPopup('edit');
};
