import { API } from 'shared/api';

export const likeHandler = async (pinID: string) => {
    const icon = document.querySelector<HTMLImageElement>('#like');
    const counter = document.querySelector<HTMLParagraphElement>('#like-count');
    const count = Number(counter?.innerText);

    if (!icon || !counter) return;
    const isLiked = icon.classList.contains('like_active');

    const response = await API.post('/like', { pin_id: Number(pinID) });
    if (!(response instanceof Response && response.ok)) {
        return;
    }

    icon.classList.toggle('like', isLiked);
    icon.classList.toggle('like_active', !isLiked);
    counter.textContent = (count + (isLiked ? -1 : 1)).toString();
};
