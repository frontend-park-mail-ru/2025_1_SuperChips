type TScrollState = 'enabled' | 'disabled';

export const toggleScroll = (state: TScrollState) => {
    document.body.style.overflow = state === 'enabled' ? '' : 'hidden';
};
