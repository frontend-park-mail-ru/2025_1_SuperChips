export const closeCSAT = () => {
    // const iframe = document.querySelector<HTMLIFrameElement>('#CSAT-frame');
    const popup = document.querySelector('.CSAT-popup');
    popup?.remove();


    if (window.top) {
        window.top.postMessage('close-iframe', '*');
    }

    // TODO
    // document.cookie.
};
