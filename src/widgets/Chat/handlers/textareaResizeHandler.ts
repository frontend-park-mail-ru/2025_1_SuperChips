export const textareaResizeHandler = () => {
    const maxHeight = 120;
    const showCounterThreshold = 450;
    const maxLength = 500;

    const textarea = document.querySelector<HTMLTextAreaElement>('#chat-input');
    const charCounter = document.querySelector<HTMLElement>('#chat-char-counter');
    const messageBox = document.querySelector<HTMLElement>('.chat__messages');
    const container = document.querySelector<HTMLElement>('.chat__input-container');
    // const chatInput = container.querySelector('#chat-input');

    if (!textarea || !messageBox || !container) return;

    // TODO пофиксить наезжающий на сообщения инпут
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    messageBox.scrollTop = messageBox.scrollHeight;

    messageBox.style.maxHeight = `${window.innerHeight - 220 - textarea.clientHeight}px`;
    messageBox.style.height = `${window.innerHeight - 220 - textarea.clientHeight}px`;

    if (!charCounter) return;
    const currentLength = textarea.value.length;
    if (currentLength >= showCounterThreshold) {
        charCounter.textContent = `${currentLength}/${maxLength}`;
        charCounter.style.display = 'block';
    } else {
        charCounter.style.display = 'none';
    }
};
