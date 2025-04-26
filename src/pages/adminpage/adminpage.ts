import template from './adminpage.hbs';
import './adminpage.scss';
import { API } from '../../shared/api';


export const AdminPage = async () => {
    const page = document.createElement('div');

    page.innerHTML = template(config);

    const response = await API.get('/api/v1/polls/stats/all');
    if (!(response instanceof  Response && response.ok)) return;

    const body = await response.json();

    console.log(body);

    const config = {
        stats: []
    };

    return page;
};
