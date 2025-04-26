import { getStarColor, handleStarBarClick } from '../handlers/handleStarBarClick';
import template from './StarBar.hbs';
import './StarBar.scss';


export const StarBar = (barValue: number) => {
    // const iframe = document.querySelector<HTMLIFrameElement>('#CSAT-frame');
    const iframeDoc = document;

    const container = document.createElement('div');
    const color = getStarColor(barValue);

    const stars = Array.from({ length: 10 }, (_, i) => {
        const value = i + 1;
        return {
            value,
            color: color,
            active: value <= barValue,
        };
    });

    container.innerHTML = template({ stars });
    container.querySelector('.star-rating')?.addEventListener('click', handleStarBarClick);

    const starsList = container.querySelectorAll<HTMLSpanElement>('.star');

    for (let i = 0; i < stars.length; i++) {
        starsList[i].style.color = i < barValue ? color : '#ccc';
        starsList[i].classList.toggle('active', i < barValue);
    }


    return container.firstElementChild as HTMLElement;
};
