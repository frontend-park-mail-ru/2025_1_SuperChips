import { CSATState } from '../ui/CSAT';


export const validateSubmitButton = () => {
    const submitButton = document.querySelector<HTMLButtonElement>('#CSAT-submit');

    if (CSATState.pages.some(page => (!!page.value))) {
        if (submitButton) CSATState.canSubmit = true;
    } else {
        if (submitButton) CSATState.canSubmit = false;
    }
};
