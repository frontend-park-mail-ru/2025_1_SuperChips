const dropdownWidth = 360;
const dropdownHeight = 300;

export const findPosition = (pinID: string) => {
    const pin = document.querySelector('.dropdown-icon')
        || document.querySelector(`#pin-${pinID}`);
    const rect = pin?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };


    let x = rect.left - 80;
    let y = rect.top + 60;

    if (y + 60 + dropdownHeight > window.innerHeight) {
        y = y - dropdownHeight - 60;
    }

    if (x + dropdownWidth > window.innerWidth) {
        x = window.innerWidth - (dropdownWidth) - 40;
    }

    return { x: x, y: y };
};
