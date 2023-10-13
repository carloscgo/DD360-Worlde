// infrastructure/ui/components/Points

type PropsPoints = {
    value: number
    label: string
}

export default function Points({ value, label }: PropsPoints) {
    return (
        <div className="flex flex-col text-black dark:text-white">
            <h3 className="text-center  text-[35px] font-extrabold">
                {value}
            </h3>
            <div className="text-center text-[21px] font-normal">
                {label}
            </div>
        </div>
    )
}
