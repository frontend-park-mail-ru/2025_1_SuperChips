import { getImageColors } from 'shared/utils/lib/getImageColors';
import { boardFeedState } from '../ui/BoardPage';

/**
 * Функция для обновления цветов разделителя на основе цветов пинов
 * Берет до 10 последних пинов и извлекает из них цвета для градиента
 */
export const updateDividerColors = async (): Promise<void> => {
    const divider = document.querySelector('.divider');
    if (!divider) {
        return;
    }

    const feed = document.querySelector('#feed');
    if (!feed) {
        return;
    }

    const pins = feed.querySelectorAll('.pin');
    if (!pins || pins.length === 0) {
        divider.setAttribute('style', 
            'background: linear-gradient(45deg, #FFA500, #32CD32, #1E90FF, #FF69B4); ' +
            'background-size: 300% 300%; ' +
            'animation: gradientBG 8s ease infinite;');
        return;
    }

    const recentPins = Array.from(pins).slice(0, 10);
    
    const imageUrls: string[] = [];
    recentPins.forEach(pin => {
        const img = pin.querySelector('.pin__picture') as HTMLImageElement;
        if (img && img.src) {
            imageUrls.push(img.src);
        }
    });

    if (imageUrls.length === 0) {
        return;
    }

    // Собираем цвета из всех доступных изображений
    let allColors: string[] = [];
    
    // Обрабатываем каждое изображение и собираем все цвета
    for (const imageUrl of imageUrls) {
        const imageColors = await getImageColors(imageUrl);
        allColors = [...allColors, ...imageColors];
    }
    
    const uniqueColors = [...new Set(allColors)];
    const finalColors = uniqueColors.slice(0, 4);
    
    // Если цветов не нашлось, используем дефолтные
    if (finalColors.length === 0) {
        finalColors.push('#FFA500', '#32CD32', '#1E90FF', '#FF69B4');
    }

    const gradientStyle = `background: linear-gradient(45deg, ${finalColors.join(', ')}); ` +
        'background-size: 300% 300%; ' +
        'animation: gradientBG 8s ease infinite;';
    
    divider.setAttribute('style', gradientStyle);
    
    setTimeout(() => {}, 100);
};