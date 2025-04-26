// import { API } from 'shared/api';

import { CSATState } from '../ui/CSAT';

export const handleCSATSubmit = () => {
    // TODO
    // const response = API.post('/api/v1/polls', { value:  });
    document.querySelector('.CSAT-popup')?.remove();

    const body = CSATState.pages.map((item) => {
        return {
            type: item.type,
            content: item.value,
            question_id: item.id,
        };
    });

    console.log(body);

    setTimeout(() => {
        CSATState.canSubmit = false;
        CSATState.page = 1;
        CSATState.pages = [];
    }, 10);


};
