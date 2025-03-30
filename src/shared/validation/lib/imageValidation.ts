import { MAX_IMAGE_SIZE } from 'shared/config/constants';
import { ValidationResult } from './types';

const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
];

const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

export const validateImage = (image: File): ValidationResult => {
    if (image.size > MAX_IMAGE_SIZE) {
        return {
            isValid: false,
            error: 'Размер должен быть не более 3 Мб',
        };
    }

    const fileExt = image.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedTypes.includes(image.type) || !validExtensions.includes(fileExt))
        return {
            isValid: false,
            error: 'Тип файла должен быть jpg, png, jpeg или gif',
        };

    return { isValid: true, error: '' };
};
