import './skeleton.css';

export const createSkeleton = (url) => {
    const img = document.createElement('img');
    img.classList.add('feedSkeleton');
    img.src = url;
    return img;
};
