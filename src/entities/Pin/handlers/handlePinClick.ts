import { saveScrollPosition } from 'shared/utils/saveScrollPosition';
import { navigate } from 'shared/router';

export const handlePinClick = (event: Event, pinID: string) => {
    event.preventDefault();
    saveScrollPosition();
    navigate(`pin/${pinID}`);
}; 