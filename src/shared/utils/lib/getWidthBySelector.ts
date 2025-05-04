export const getWidthBySelector = (selector: string) => {
    const temp = document.createElement('div');
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.pointerEvents = 'none';
    document.body.appendChild(temp);

    temp.className = selector.replace('.', '');
    const width = getComputedStyle(temp).width;

    document.body.removeChild(temp);
    return +(width.replace('px', ''));
};
