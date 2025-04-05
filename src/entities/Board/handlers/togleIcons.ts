export const toggleIcons = () => {
    const pen = document.querySelector<HTMLImageElement>('.preview__icon-edit');
    const bin = document.querySelector<HTMLImageElement>('.preview__icon-delete');

    pen?.classList.toggle('hidden');
    bin?.classList.toggle('hidden');
};
