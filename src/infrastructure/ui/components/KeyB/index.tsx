// infrastructure/ui/components/KeyB

import { MouseEventHandler, ReactNode } from "react"

type PropsKeyB = {
    children: string | ReactNode
    onClick?: (event: MouseEventHandler) => MouseEventHandler<HTMLButtonElement>
    color: 'green' | 'yellow' | 'gray' | 'opaque'
}

export default function KeyB({ children, color, onClick }: PropsKeyB) {
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
        'opaque': {
            bg: 'bg-white dark:bg-slate-800 border border-black dark:border-slate-400',
            text: 'text-black dark:text-white',
        },
    }[color];

    const handlerClick: any = (event: MouseEventHandler<HTMLButtonElement>) => {
        if (clickIsFunction) {
            onClick(event);
        }
    };

    return (
        <button
            className={`w-[76px] h-[76px] ${mapColors.bg} ${mapColors.text} rounded-[5px] text-[35px] font-extrabold`}
            role={clickIsFunction ? 'button' : 'div'}
            onClick={handlerClick}
        >
            {children}
        </button>
    )
};
