// infrastructure/ui/components/Keyboard

import { memo, useContext, useEffect, useRef } from "react";
import KeyB from "../KeyB";
import ThemeContext from "../ThemeContext";
import { keydown } from "../../utils/helpers";

type PropsKeyboard = {
    onKeydown: (key: string) => void
}

const Keyboard = memo(function Keyboard({ onKeydown }: PropsKeyboard) {
    const started = useRef<boolean>(false);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (!started.current) {
            started.current = true;

            document.addEventListener("keydown", (event) => keydown(event.key, onKeydown));
        }

        return () => {
            document.removeEventListener("keydown", (event) => keydown(event.key, onKeydown));
        }
    }, [onKeydown])

    return (
        <div className="w-[638px] h-[238px] bg-gray-300 bg-opacity-5 rounded-[15px] pl-[20px] pr-[37px] py-[33px] flex flex-col gap-[9.57px]">
            <div className="flex justify-center items-center gap-[9.57px] w-100">
                {'QWERTYUIOP'.split('').map(char => (
                    <KeyB key={char} color='light' isKey onClick={() => onKeydown(char)}>{char}</KeyB>
                ))}
            </div>
            <div className="flex justify-end items-center gap-[9.57px] w-100">
                {'ASDFGHJKLÑ'.split('').map(char => (
                    <KeyB key={char} color='light' isKey onClick={() => onKeydown(char)}>{char}</KeyB>
                ))}
            </div>
            <div className="flex justify-start items-center gap-[9.57px] w-100">
                <KeyB color='light' isKey>ENTER</KeyB>
                {'ZXCVBNM'.split('').map(char => (
                    <KeyB key={char} color='light' isKey onClick={() => onKeydown(char)}>{char}</KeyB>
                ))}
                <KeyB color='light' isKey style={{ width: '71px' }}>
                    <img src={`/images/backspace-${theme}.svg`} alt="Backspace" onClick={() => onKeydown('Backspace')} />
                </KeyB>
            </div>
        </div>
    )
});

export default Keyboard;
