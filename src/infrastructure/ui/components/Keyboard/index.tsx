// infrastructure/ui/components/Keyboard

import { useContext, useEffect } from "react";
import KeyB from "../KeyB";
import ThemeContext from "../ThemeContext";

export const keydown = ({ key }: { key: string }) => {
    console.log({ key })
};

export default function Keyboard() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.addEventListener("keydown", keydown);

        return () => {
            document.removeEventListener("keydown", keydown)
        }
    }, [])

    return (
        <div className="w-[638px] h-[238px] bg-gray-300 bg-opacity-5 rounded-[15px] pl-[20px] pr-[37px] py-[33px] flex flex-col gap-[9.57px]">
            <div className="flex justify-center items-center gap-[9.57px] w-100">
                {'QWERTYUIOP'.split('').map(char => (
                    <KeyB key={char} color='light' isKey>{char}</KeyB>
                ))}
            </div>
            <div className="flex justify-end items-center gap-[9.57px] w-100">
                {'ASDFGHJKLÑ'.split('').map(char => (
                    <KeyB key={char} color='light' isKey>{char}</KeyB>
                ))}
            </div>
            <div className="flex justify-start items-center gap-[9.57px] w-100">
                <KeyB color='light' isKey>ENTER</KeyB>
                {'ZXCVBNM'.split('').map(char => (
                    <KeyB key={char} color='light' isKey>{char}</KeyB>
                ))}
                <KeyB color='light' isKey style={{ width: '71px' }}>
                    <img src={`/images/backspace-${theme}.svg`} alt="Backspace" />
                </KeyB>
            </div>
        </div>
    )
}