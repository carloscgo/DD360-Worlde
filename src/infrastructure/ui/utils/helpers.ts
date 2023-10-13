// infrastructure/ui/utils/helpers

export const timeConvert = (time: number): string => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const fillArrayKeys = (keysB: string[], defaultValue: string | boolean | number = '') => {
    const array = keysB.concat(Array(25 - keysB.length).fill(defaultValue));

    const chunkSize = array.length / 5;
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);

        chunks.push(chunk);
    }

    return chunks;
}

export const keydown = (key: string, onKeydown: (key: string) => void) => {
    onKeydown(key);
};

