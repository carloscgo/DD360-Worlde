// infrastructure/ui/components/Table

import { Fragment, memo, useEffect, useRef } from "react";
import KeyB from "../KeyB";
import { fillArrayKeys } from "../../utils/helpers";
import { Some } from "../../../../application";

type PropsTable = {
    word: string
    keysB: string[]
    onComplete: () => void
}

const NUM_ROWS = 5;
const NUM_COLS = 5;

export default memo(function Table({ word, keysB, onComplete }: PropsTable) {
    const currentRow = useRef<number>(0);
    const sending = useRef<boolean>(false);
    const completed = useRef<{ [key: number]: Some[] }>(fillArrayKeys([], false));
    const letterColors = useRef<{ [key: number]: Some[] }>(fillArrayKeys([], 'light'));
    const arrayKeys = useRef<{ [key: number]: Some[] }>(fillArrayKeys([], 0));

    const checkLetter = (lettersArray: string[], col: number, row: number) => {
        let color = 'light';

        if (lettersArray.filter(value => value).length === NUM_COLS) {
            const wordUpper = word.toUpperCase();
            const wordArray = wordUpper.split('');

            const charUpper = lettersArray[col].toUpperCase();
            const wordChar = wordArray[col];

            if (wordChar === charUpper) {
                completed.current[row][col] = true;

                color = 'green';
            } else {
                completed.current[row][col] = false;

                if (wordUpper.includes(charUpper)) {
                    color = 'yellow';
                } else {
                    color = 'gray';
                }
            }
        }

        return color;
    };

    useEffect(() => {
        currentRow.current = 0;
        sending.current = false;
        completed.current = fillArrayKeys([], false);
        letterColors.current = fillArrayKeys([], 'light');
        arrayKeys.current = fillArrayKeys([], 0);
    }, [word]);

    useEffect(() => {
        if (!sending.current) {
            const lastIndex = keysB.filter(value => value).length - 1;
            let rowIndex = Math.floor(lastIndex / 5);
            rowIndex = rowIndex > -1 ? rowIndex : 0;

            currentRow.current = rowIndex;

            if (Object.values(completed.current[rowIndex]).filter(value => value).length === NUM_COLS) {
                sending.current = true;

                onComplete();

                return;
            }
        }
    }, [sending.current, Object.values(completed.current)]);

    useEffect(() => {
        arrayKeys.current = fillArrayKeys(keysB);

        Array(NUM_ROWS).fill('').map((_, row) => {
            Array(NUM_COLS).fill('').map((_, col) => {
                letterColors.current[row][col] = checkLetter(arrayKeys.current[row], col, row);
            });
        });
    }, [keysB]);

    return (
        <div className="flex flex-wrap items-center justify-center gap-[10px] w-[420px] mb-[50px]">
            {Array(NUM_ROWS).fill('').map((_, row) => (
                <Fragment key={row}>
                    {Array(NUM_COLS).fill('').map((_, col) => (
                        <KeyB key={`${row}-${col}`} color={letterColors.current[row][col]}>
                            {typeof arrayKeys.current[row][col] === 'string' ? arrayKeys.current[row][col].toUpperCase() : ''}
                        </KeyB>
                    ))}
                </Fragment>
            ))}
        </div>
    )
});
