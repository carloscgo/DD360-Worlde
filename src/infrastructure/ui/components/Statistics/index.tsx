// infrastructure/ui/components/Statistics

import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Points from "../Points";
import { timeConvert } from "../../utils/helpers";

type PropsStatistics = {
    show: boolean
    plays: number
    victories: number
    timer: number
    word?: string
}

export default function Statistics({ show, plays, victories, timer, word }: PropsStatistics) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(timer);
    const timerInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setShowModal(show);
        setTimeLeft(timer);
    }, [show]);

    useEffect(() => {
        timerInterval.current = setInterval(() => {
            setTimeLeft((state) => {
                if (state > 0) {
                    return state - 1;
                }

                return 0;
            });
        }, 1000);

        return () => {
            if (timerInterval.current !== null) {
                clearInterval(timerInterval.current);
            }

            setTimeLeft(0);
        }
    }, []);

    useEffect(() => {
        if (timeLeft < 0 && timerInterval.current !== null) {
            clearInterval(timerInterval.current);
        }
    }, [timeLeft]);

    return (
        <Modal
            title='Estadísticas'
            labelButton='Aceptar'
            show={showModal}
            onClose={() => setShowModal(false)}
        >
            <div className="text-black dark:text-white mx-auto w-[100%]">
                <div className="flex flex-row justify-around">
                    <Points value={plays} label="Jugadas" />
                    <Points value={victories} label="Victorias" />
                </div>

                {word && (
                    <div className="flex justify-center h-[52px] text-[19px] mt-[43px] mb-[10px]">
                        <span className="font-normal">La palabra era:&nbsp;</span>
                        <span className="font-bold">{word.toUpperCase()}</span>
                    </div>
                )}

                <div className="flex flex-col items-center gap-5 mb-[10px]">
                    <div className="text-[19px] font-normal">SIGUIENTE PALABRA</div>
                    <div className="text-2xl font-bold">{timeConvert(timeLeft)}</div>
                </div>
            </div>
        </Modal>
    )
}