/**
 * Утилита для получения средних цветов изображения
 * Сжимает изображение до размера 2x2 пикселя и извлекает цвета
 */

/**
 * Проверяет, является ли URL внешним (не с того же домена)
 * @param url URL для проверки
 * @returns всегда false, так как мы предполагаем, что работаем на домене yourflow.ru
 */
const isExternalUrl = (url: string): boolean => {
    return false;
};

export const getImageColors = async (imageUrl: string): Promise<string[]> => {
    console.log('Processing image:', imageUrl);
    const defaultColors = ['#FFA500', '#32CD32', '#1E90FF', '#FF69B4'];
    
    const cachedColors = sessionStorage.getItem(`imageColors:${imageUrl}`);
    if (cachedColors) {
        try {
            const colors = JSON.parse(cachedColors);
            console.log('Using cached colors:', colors);
            return colors;
        } catch (e) {
            console.error('Error parsing cached colors:', e);
        }
    }
    
    return new Promise((resolve) => {
        const img = new Image();
        
        const loadImage = (url: string) => {
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        console.error('Failed to get canvas context');
                        resolve(defaultColors);
                        return;
                    }
                    
                    canvas.width = 2;
                    canvas.height = 2;
                    ctx.drawImage(img, 0, 0, 2, 2);
                    const imageData = ctx.getImageData(0, 0, 2, 2).data;
                    const colors: string[] = [];
                    for (let i = 0; i < imageData.length; i += 4) {
                        const r = imageData[i];
                        const g = imageData[i + 1];
                        const b = imageData[i + 2];
                        colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
                    }
                    
                    console.log('Extracted colors:', colors);
                    sessionStorage.setItem(`imageColors:${imageUrl}`, JSON.stringify(colors));
                    
                    resolve(colors);
                } catch (error) {
                    console.error('Error extracting colors:', error);
                    resolve(defaultColors);
                }
            };

            img.onerror = (error) => {
                console.error('Error loading image:', error);
                resolve(defaultColors);
            };

            img.src = url;
        };

        loadImage(imageUrl);
    });
};