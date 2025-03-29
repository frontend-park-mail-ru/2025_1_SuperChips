import './skeleton.scss';

export const Pin = (url: string) => {
    const img = document.createElement('img');
    img.classList.add('feedSkeleton');
    img.src = url;
    return img;
};
