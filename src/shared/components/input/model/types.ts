export interface IInputConfig {
    type: string;
    id: string;
    placeholder?: string;
    value?: string;
    inputLabel: string;
    errorMessage: string;
    required?: boolean;
    maxlength?: number;
    autocomplete?: string;
    isPassword?: boolean;
    transparent?: boolean;
    onInput?: (event: Event, form?: HTMLFormElement) => void;
}
