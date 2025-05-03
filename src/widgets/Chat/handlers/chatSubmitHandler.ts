import { sendMessage } from './sendMessage';

export const chatSubmitHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        if (event.shiftKey) {
            return;
        } else {
            event.preventDefault();
            sendMessage();
        }
    }
};
