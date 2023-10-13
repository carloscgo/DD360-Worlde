// infrastructure/ui/components/KeyB

import { ReactNode, useEffect, useState } from "react"

type PropsKeyB = {
    children: string | ReactNode
    onClick?: () => void
    color: 'green' | 'yellow' | 'gray' | 'opaque' | 'light'
    isKey?: boolean
    [key: string]: string | number | any
}

export default function KeyB({ children, color, isKey, onClick, ...props }: PropsKeyB) {
    const [styles, setStyles] = useState<string>('');

    const clickIsFunction = typeof onClick === 'function';

    const colorText = isKey ? 'text-black dark:text-white' : 'text-white';

    const mapColors = {
        'green': {
            bg: 'bg-neutral-500 dark:bg-neutral-500',
            text: colorText,
        },
        'yellow': {
            bg: 'bg-yellow-500 dark:bg-yellow-500',
            text: colorText,
        },
        'gray': {
            bg: 'bg-neutral-400 dark:bg-neutral-400',
            text: colorText,
        },
        'light': {
            bg: 'bg-gray-300 dark:bg-slate-600',
            text: colorText,
        },
        'opaque': {
            bg: 'bg-white dark:bg-slate-800 border border-black dark:border-slate-400',
            text: colorText,
        },
    }[color];

    useEffect(() => {
        if (isKey) {
            setStyles(`min-w-[44.67px] h-[51px] flex items-center justify-center ${mapColors.bg} ${mapColors.text} px-[10.5px] rounded-[5px] text-[18px] font-semibold`);
        } else {
            setStyles(`w-[76px] h-[76px] flex items-center justify-center ${mapColors.bg} ${mapColors.text} rounded-[5px] text-[35px] font-extrabold`);
        }
    }, [isKey, color]);

    const handlerClick: any = () => {
        if (clickIsFunction) {
            onClick();
        }
    };

    return (
        <div
            className={styles}
            role={isKey ? 'button' : ''}
            onClick={handlerClick}
            {...props}
        >
            {children}
        </div>
    )
};
