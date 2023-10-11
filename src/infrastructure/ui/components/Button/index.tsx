// infrastructure/ui/components/Button

import { ReactNode } from "react"

type PropsButton = {
    children: string | ReactNode
    onClick: () => void
}

export default function Button({ children, onClick }: PropsButton) {
    return (
        <button
            className="w-[263px] h-[50px] bg-neutral-500 rounded-[5px] text-white text-[28px] font-extrabold"
            onClick={onClick}
        >
            {children}
        </button>
    )
};
