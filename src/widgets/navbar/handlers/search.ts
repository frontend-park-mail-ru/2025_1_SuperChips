import { API } from 'shared/api';
import { feedState } from 'pages/FeedPage';

export const search = async (event: Event) => {
    event.preventDefault();
    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (!searchInput) return;

    const query = searchInput.value;
    const filter = feedState.filter;
    const response = await API.get(`/api/v1/search/${filter}?query=${query}&page=${1}&size=${20}`);

    // TODO убрать моки, написать логику
    console.log(response);
    if (response instanceof Response && response.ok) {
        const body = await response.json();
        console.log(body);
    }
};
