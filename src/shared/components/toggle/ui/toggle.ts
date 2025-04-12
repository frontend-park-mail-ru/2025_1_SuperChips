import template from './toggle.hbs';
import './toggle.scss';


export const Toggle = (toggleID: string) => {
    const div = document.createElement('div');
    div.innerHTML = template({ id: toggleID });
    return div;
};
