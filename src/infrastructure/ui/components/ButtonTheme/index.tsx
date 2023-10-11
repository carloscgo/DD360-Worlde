// infrastructure/ui/components/ButtonTheme

import { forwardRef } from "react"

type PropsButtonTheme = {
    type: 'dark' | 'light'
    onChange: () => void
}

const ButtonTheme = forwardRef<HTMLDivElement, PropsButtonTheme>(function ({ type, onChange }, ref) {
    return (
        <div
            onClick={onChange}
            aria-label={`${type} icon`}
            role="button"
            ref={ref}
            className={`${type} cursor-pointer`}
        >
            <img className="w-[78px] h-[38px]" src={`/images/theme-${type}.svg`} />
        </div>
    )
})

export default ButtonTheme