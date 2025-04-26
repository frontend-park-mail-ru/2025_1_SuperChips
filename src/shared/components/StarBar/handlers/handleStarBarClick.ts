export const starBarClickEvent = 'starBarClick';

export const handleStarBarClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const index = +target.id.split('-')[1];

    const color = getStarColor(index);
    const stars = document.querySelectorAll<HTMLSpanElement>('.star');

    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = i < index ? color : '#ccc';
        stars[i].classList.toggle('active', i < index);
    }

    target.dispatchEvent(new Event('starBarClick', { bubbles: true }));
};

export const getStarColor = (rating: number): string => {
    if (rating <= 2) return '#FF4A4A';
    if (rating <= 4) return '#FFA909';
    if (rating <= 6) return '#F5F067';
    if (rating <= 8) return '#8DFFA2';
    return '#3AFB40';
};
