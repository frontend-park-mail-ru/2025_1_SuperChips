import { DeskPopup } from '../components/popup/DeskPopup';

export const deleteDesk = async (event: Event) => {
    const icon = event.target as HTMLImageElement;
    const name = icon.id.slice(7);


    // Когда будет готова ручка для удаления досок, сюда добавится логика


    DeskPopup('delete');
};
