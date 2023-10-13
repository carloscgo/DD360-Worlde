// infrastructure/ui/components/Table

import { memo } from "react";
import KeyB from "../KeyB";

type PropsTable = {
    word?: string
    keysB: string[]
}

export default memo(function Table({ word, keysB }: PropsTable) {
    const checkLetter = (char: string, index: number) => {
        if (!char || !word) return 'light';

        const charUpper = char.toUpperCase();
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split('');
        const wordChar = wordArray[index];

        if (wordChar === charUpper) {
            return 'green';
        }

        if (wordUpper.includes(charUpper)) {
            return 'yellow';
        }

        return 'gray';
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-[10px] w-[420px] mb-[50px]">
            {Array(26).fill('', 0, 25).map((_, index) => (
                <KeyB key={index} color={checkLetter(keysB[index], index)}>{keysB[index]?.toUpperCase()}</KeyB>
            ))}
        </div>
    )
});
