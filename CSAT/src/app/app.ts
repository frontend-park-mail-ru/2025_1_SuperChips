import { CSAT } from '../widgets/CSAT';
import './styles/global.scss';
import './styles/fonts.scss';
import './styles/common.scss';



type TQuestionType = 'stars' | 'text';

interface ICSATQuestion {
    text: string,
    order: number | null,
    type: TQuestionType,
    value: number | string,
    id: number,
}

interface ICSATPoll {
    id: number;
    header: string;
    questions: ICSATQuestion[];
    delay: number;
}





export const AppIframe = async () => {
    window.onmessage = function(event){
        if (event.data.type === 'render-iframe') {
            renderCSAT(event.data.data.poll);
        }
    };
};

const renderCSAT = async (poll: ICSATPoll) => {
    const newCSAT = await CSAT(poll);

    const iframeDoc = document;
    if (!iframeDoc) return;

    let root = iframeDoc.getElementById('root1');
    if (!root) {
        root = iframeDoc.createElement('div');
        root.id = 'root1';
        iframeDoc.body.appendChild(root);
    }

    root.appendChild(newCSAT);
};
