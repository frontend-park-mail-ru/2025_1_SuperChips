import { handleCSATSubmit } from '../handlers/handleCSATSubmit';
import { StarBar, starBarClickEvent } from 'shared/components/StarBar';
// import { API } from 'shared/api';
import template from './CSAT.hbs';
import './CSAT.scss';
import { validateSubmitButton } from '../handlers/validateSubmitButton';
import { closeCSAT } from '../handlers/closeCSAT';

type TQuestionType = 'stars' | 'text';

interface ICSATQuestion {
    text: string,
    order: number | null,
    type: TQuestionType,
    value: number | string,
    id: number,
}

interface ICSATState {
    pages: ICSATQuestion[],
    page: number,
    length: number,
    canSubmit: boolean,
}


export const CSATState: ICSATState = {
    pages: [
        {
            text: 'Насколько вам нравится VK',
            order: 1,
            type: 'stars',
            value: 0,
            id: 1
        },
        {
            text: 'Насколько вам нравится Яндекс',
            order: 2,
            type: 'text',
            value: '',
            id: 2
        },
        {
            text: 'Насколько вам нравится Google',
            order: 3,
            type: 'stars',
            value: 0,
            id: 3,
        }
    ],
    page: 1,
    length: 3,
    canSubmit: false,
};


// для переключения по страницам указывать номер и делать перерендер
export const CSAT = async (poll: string) => {
    const container = document.createElement('div');
    container.classList.add('CSAT-popup');

    if (CSATState.pages.length === 0) {
        CSATState.page = 1;

        // TODO
        // const response = API.get(`/api/v1/polls?${poll}`);
        // if (!(response instanceof Response && response.ok)) return container;

        // const body = await response.json();
        // CSATState.pages = body.data.questions;
    }

    const currentPage = CSATState.pages[CSATState.page - 1];

    const config = {
        header: currentPage.text,
        stars: currentPage.type === 'stars',
        text: currentPage.type === 'text',
        value: currentPage.value ?? null,
        firstQuestion: CSATState.page === 1,
        onlyQuestion: CSATState.pages.length === 1,
        lastQuestion: CSATState.page === CSATState.pages.length,
        total: CSATState.pages.length,
        page: CSATState.page,
        canSubmit: CSATState.canSubmit,
    };

    container.innerHTML = template(config);

    const placeholder = container.querySelector('.star-bar-placeholder');
    if (placeholder) {
        const starBar = StarBar(Number(CSATState.pages[CSATState.page - 1].value));
        placeholder?.replaceWith(starBar);
    }

    const nextButton = container.querySelector<HTMLButtonElement>('.CSAT-next');
    nextButton?.addEventListener('click', async () => {
        const prevCSAT = document.querySelector('.CSAT-popup');
        if (!prevCSAT) return;

        saveCSATState();
        CSATState.page = Math.min(CSATState.page + 1, CSATState.length);
        const newCSAT = CSAT(poll);
        prevCSAT.replaceWith(await newCSAT);
    });


    const prevButton = container.querySelector<HTMLButtonElement>('.CSAT-prev');
    prevButton?.addEventListener('click', async () => {
        const prevCSAT = document.querySelector('.CSAT-popup');
        if (!prevCSAT) return;

        saveCSATState();
        CSATState.page = Math.max(CSATState.page - 1, 0);
        const newCSAT = CSAT(poll);
        prevCSAT.replaceWith(await newCSAT);
    });


    container.querySelector('#CSAT-submit')?.addEventListener('click', handleCSATSubmit);
    container.querySelector('#CSAT-close')?.addEventListener('click', closeCSAT);

    container.addEventListener(starBarClickEvent, validateSubmitButton);
    container.addEventListener('input', validateSubmitButton);


    return container;
};


const saveCSATState = () => {
    const type = CSATState.pages[CSATState.page - 1].type;

    if (type === 'stars') {
        const list = Array.from(document.querySelectorAll<HTMLSpanElement>('.star'));
        const count = list.filter((item) =>
            item.classList.contains('active')
        ).length;

        CSATState.pages[CSATState.page - 1].value = count.toString();
        CSATState.canSubmit = true;
    } else if (type === 'text') {
        const textarea = document.querySelector<HTMLTextAreaElement>('.CSAT-textarea');
        if (!textarea) return;

        CSATState.pages[CSATState.page - 1].value = textarea.value;
        CSATState.canSubmit = true;
    }
};


