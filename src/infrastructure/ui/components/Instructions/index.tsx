// infrastructure/ui/components/Instructions

import { useEffect, useState } from "react";
import Modal from "../Modal";
import KeyB from "../KeyB";

type PropsInstructions = {
    show: boolean
    onClose: () => void
}

export default function Instructions({ show, onClose }: PropsInstructions) {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(show)
    }, [show])

    const handlerClose = () => {
        setShowModal(false)
        onClose()
    }

    return (
        <Modal
            title='Cómo jugar'
            labelButton='!JUGAR¡'
            show={showModal}
            onClose={handlerClose}
        >
            <p className="pb-4">Adivina la palabra oculta en cinco intentos. </p>
            <p className="pb-4">Cada intento debe ser una palabra válida de 5 letras. </p>
            <p className="pb-4">Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>

            <h3 className="text-black dark:text-white text-[19px] font-bold mb-5">Ejemplos</h3>

            <div className="flex gap-1 pl-4">
                <KeyB color='green'>G</KeyB>
                <KeyB color='opaque'>A</KeyB>
                <KeyB color='opaque'>T</KeyB>
                <KeyB color='opaque'>O</KeyB>
                <KeyB color='opaque'>O</KeyB>
            </div>

            <p className="text-black dark:text-white text-[19px] my-4">
                <span className="font-normal">La letra </span>
                <span className="font-bold">G</span>
                <span className="font-normal"> está en la palabra y en la posición correcta.</span>
            </p>

            <div className="flex gap-1 pl-4">
                <KeyB color='opaque'>V</KeyB>
                <KeyB color='opaque'>O</KeyB>
                <KeyB color='yellow'>C</KeyB>
                <KeyB color='opaque'>A</KeyB>
                <KeyB color='opaque'>L</KeyB>
            </div>

            <p className="text-black dark:text-white text-[19px] my-4">
                <span className="font-normal">La letra </span>
                <span className="font-bold">C</span>
                <span className="font-normal"> está en la palabra pero en la posición incorrecta.</span>
            </p>

            <div className="flex gap-1 pl-4">
                <KeyB color='opaque'>C</KeyB>
                <KeyB color='opaque'>A</KeyB>
                <KeyB color='opaque'>N</KeyB>
                <KeyB color='opaque'>T</KeyB>
                <KeyB color='gray'>O</KeyB>
            </div>

            <p className="text-black dark:text-white text-[19px] mt-[36px] mb-[31px]">
                Puede haber letras repetidas. Las pistas son independientes para cada letra.
            </p>

            <p className="text-black dark:text-white text-[19px] text-center mb-[10px]">
                ¡Una palabra nueva cada 5 minutos!
            </p>
        </Modal>
    )
}