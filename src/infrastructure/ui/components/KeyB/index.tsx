// infrastructure/ui/components/KeyB

import { MouseEventHandler, ReactNode, useEffect, useState } from "react"

type PropsKeyB = {
    children: string | ReactNode
    onClick?: (event: MouseEventHandler) => MouseEventHandler<HTMLButtonElement>
    color: 'green' | 'yellow' | 'gray' | 'opaque' | 'light'
    isKey?: boolean
    [key: string]: string | number | any
}

export default function KeyB({ children, color, isKey, onClick, ...props }: PropsKeyB) {
    const [styles, setStyles] = useState<string>('');

    const clickIsFunction = typeof onClick === 'function';

    const mapColors = {
        'green': {
            bg: 'bg-neutral-500 dark:bg-neutral-500',
            text: 'text-black dark:text-white',
        },
        'yellow': {
            bg: 'bg-yellow-500 dark:bg-yellow-500',
            text: 'text-black dark:text-white',
        },
        'gray': {
            bg: 'bg-neutral-400 dark:bg-neutral-400',
            text: 'text-black dark:text-white',
        },
        'light': {
            bg: 'bg-gray-300 dark:bg-slate-600',
            text: 'zinc-600 dark:text-white',
        },
        'opaque': {
            bg: 'bg-white dark:bg-slate-800 border border-black dark:border-slate-400',
            text: 'text-black dark:text-white',
        },
    }[color];

    useEffect(() => {
        if (isKey) {
            setStyles(`min-w-[44.67px] h-[51px] flex items-center justify-center ${mapColors.bg} ${mapColors.text} px-[10.5px] rounded-[5px] text-[18px] font-semibold`);
        } else {
            setStyles(`w-[76px] h-[76px] flex items-center justify-center ${mapColors.bg} ${mapColors.text} rounded-[5px] text-[35px] font-extrabold`);
        }
    }, [isKey]);

    const handlerClick: any = (event: MouseEventHandler<HTMLButtonElement>) => {
        if (clickIsFunction) {
            onClick(event);
        }
    };

    return (
        <button
            className={styles}
            role={clickIsFunction ? 'button' : 'div'}
            onClick={handlerClick}
            {...props}
        >
            {children}
        </button>
    )
};
