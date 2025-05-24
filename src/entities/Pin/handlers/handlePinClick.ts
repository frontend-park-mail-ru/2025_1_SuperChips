import { navigate } from 'shared/router';

export const handlePinClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const pin = target.closest('.pin');
    if (!pin) return;

    const pinId = pin.getAttribute('data-pin-id');
    if (!pinId) return;

    navigate(`/pin/${pinId}`);
}; 