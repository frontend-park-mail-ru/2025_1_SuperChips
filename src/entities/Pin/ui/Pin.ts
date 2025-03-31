import './Pin.scss';

export const Pin = (url: string) => {
    const div = document.createElement('div');
    div.classList.add('pin');

    const img = document.createElement('img');
    img.src = url;
    div.appendChild(img);

    return div;
};
