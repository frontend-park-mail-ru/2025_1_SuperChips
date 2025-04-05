export interface IInputConfig {
    type: string;
    id: string;
    inputLabel: string;
    errorMessage: string;
    required?: boolean;
    maxlength?: number;
    autocomplete?: string;
    isPassword?: boolean;
    transparent?: boolean;
}
