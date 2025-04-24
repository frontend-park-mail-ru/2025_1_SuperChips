type TScrollState = 'enabled' | 'disabled';

export const toggleScroll = (state: TScrollState) => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const overflow = state === 'enabled' ? '' : 'hidden';
    const padding = state === 'enabled' ? '0' : `${scrollbarWidth}px`;
    console.log(padding);

    document.body.style.overflow = overflow;
    document.body.style.paddingRight = padding;

    const navbar = document.querySelector<HTMLDivElement>('#navbar');
    if (navbar) {
        navbar.style.paddingRight = padding;
    }
};
