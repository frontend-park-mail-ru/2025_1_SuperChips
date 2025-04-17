export const handleClickOutside = (
    element: HTMLElement,
    activeClass: string | null = null,
    inactiveClass: string | null = null,
    popupId: string | null = null
) => {
    const clickHandler = (e: Event) => {
        if (!element.contains(e.target as Node)) {
            if (activeClass && inactiveClass) {
                element.classList.replace(activeClass, inactiveClass);
            }
            if (popupId) {
                document.querySelector(`#${popupId}`)?.remove();
            }
            window.removeEventListener('click', clickHandler);
        }
    };

    window.addEventListener('click', clickHandler);

    return () => {
        window.removeEventListener('click', clickHandler);
    };
};
