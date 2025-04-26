import template from './Gauge.hbs';
import './Gauge.scss';

export const Gauge = (value: number) => {
    const clamped = Math.max(0, Math.min(1, value));

    const container = document.createElement('div');
    container.innerHTML = template({ percentage: clamped * 100 });

    const gauge = container.firstElementChild as HTMLElement;
    const fill = gauge.querySelector<SVGPathElement>('.gauge-fill');
    if (!fill) return gauge;


    const pathLength = fill.getTotalLength();

    fill.style.strokeDasharray = `${pathLength}`;
    fill.style.strokeDashoffset = `${pathLength}`;

    const hue = clamped * 120;
    const color = `hsl(${hue}, 100%, 60%)`;

    setTimeout(() => {
        fill.style.transition = `
            stroke-dashoffset 1s ease-out,
            stroke 1s ease-out
        `;
        fill.style.strokeDashoffset = `${pathLength * (1 - clamped)}`;
        fill.style.stroke = color;
    }, 10);

    return gauge;
};
