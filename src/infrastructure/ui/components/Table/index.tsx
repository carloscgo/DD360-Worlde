// infrastructure/ui/components/Table

import { Fragment, memo, useEffect, useRef } from "react";
import KeyB from "../KeyB";
import { fillArrayKeys } from "../../utils/helpers";

type PropsTable = {
    word?: string
    keysB: string[]
    onComplete: () => void
}

export default memo(function Table({ word, keysB, onComplete }: PropsTable) {
    const sending = useRef<boolean>(false);
    const completed = useRef<{ [key: number]: boolean }>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    const checkLetter = (char: string, index: number) => {
        if (!char || !word) return 'light';

        const charUpper = char.toUpperCase();
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split('');
        const wordChar = wordArray[index];

        if (wordChar === charUpper) {
            completed.current[index + 1] = true;

            return 'green';
        }

        completed.current[index + 1] = false;

        if (wordUpper.includes(charUpper)) {
            return 'yellow';
        }

        return 'gray';
    };

    useEffect(() => {
        sending.current = false;
    }, [word]);

    useEffect(() => {
        if (!sending.current && Object.values(completed.current).every(value => value)) {
            sending.current = true;

            onComplete();
        }
    }, [sending.current, Object.values(completed.current)]);

    const arrayKeys = fillArrayKeys(keysB);

    return (
        <div className="flex flex-wrap items-center justify-center gap-[10px] w-[420px] mb-[50px]">
            {Array(5).fill('', 0, 5).map((_, index1) => (
                <Fragment key={index1}>
                    {Array(5).fill('', 0, 5).map((_, index2) => (
                        <KeyB key={index2} color={checkLetter(arrayKeys[index1][index2], index2)}>
                            {arrayKeys[index1][index2]?.toUpperCase()}
                        </KeyB>
                    ))}
                </Fragment>
            ))}
        </div>
    )
});
