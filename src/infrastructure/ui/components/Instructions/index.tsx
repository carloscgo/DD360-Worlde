// infrastructure/ui/components/Instructions

import { useEffect, useState } from "react";
import Modal from "../Modal";

type PropsInstructions = {
    show: boolean
}

export default function Instructions({ show }: PropsInstructions) {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(show)
    }, [show])

    return (
        <Modal
            title='Cómo jugar'
            labelButton='!JUGAR¡'
            show={showModal}
            onClose={() => setShowModal(false)}
        >
            Instructions
        </Modal>
    )
}