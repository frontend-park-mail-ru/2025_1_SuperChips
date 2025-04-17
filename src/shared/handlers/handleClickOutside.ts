export const handleClickOutside = (
    element: HTMLElement,
    activeClass: string,
    inactiveClass: string,
    popupId: string
) => {
    const clickHandler = (e: Event) => {
        if (!element.contains(e.target as Node)) {
            element.classList.replace(activeClass, inactiveClass);
            document.querySelector(`#${popupId}`)?.remove();
            window.removeEventListener('click', clickHandler);
        }
    };

    window.addEventListener('click', clickHandler);

    return () => {
        window.removeEventListener('click', clickHandler);
    };
};
