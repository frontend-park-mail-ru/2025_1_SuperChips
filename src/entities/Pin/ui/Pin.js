import './Pin.css';

export const Pin = (url) => {
    const img = document.createElement('img');
    img.classList.add('feed--card');
    img.src = url;
    return img;
};
