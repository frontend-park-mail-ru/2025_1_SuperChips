// import { API } from 'shared/api';

export const likeHandler = async (pinID: string) => {
    const icon = document.querySelector<HTMLImageElement>('#like');
    const counter = document.querySelector<HTMLParagraphElement>('#like-count');
    const count = Number(counter?.innerText);

    if (!icon || !counter) return;

    const isLiked = icon.classList.contains('like_active');
    icon.classList.toggle('like', isLiked);
    icon.classList.toggle('like_active', !isLiked);

    // const response = await API.put('/api/v1/like', { pin_id: Number(pinID) });
    // if (!(response instanceof Response && response.ok)) return;

    counter.textContent = (count + (isLiked ? -1 : 1)).toString();
};
