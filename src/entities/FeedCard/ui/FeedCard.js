import './FeedCard.css';

export const FeedCard = (url) => {
    const img = document.createElement('img');
    img.classList.add('feed--card');
    img.src = url;
    return img;
};
