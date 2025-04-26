import { CSATState } from '../ui/CSAT';
import { API } from '../../../shared/api';

export const handleCSATSubmit = async (pollID: number) => {
    // const iframe = document.querySelector<HTMLIFrameElement>('#CSAT-frame');
    const iframeDoc = document;

    const body = CSATState.pages.map((item) => {
        return {
            type: item.type,
            content: item.value,
            question_id: item.question_id,
        };
    });

    console.log(body);

    const response = await API.post(`/api/v1/polls/${pollID}/answers`, { answers: body });


    if (response instanceof Response && response.ok) {
        iframeDoc.querySelector('.CSAT-popup')?.remove();
        if (window.top) {
            window.top.postMessage('close-iframe', '*');
        }
    }


    setTimeout(() => {
        CSATState.canSubmit = false;
        CSATState.page = 1;
        CSATState.pages = [];
    }, 10);
};
