// infrastructure/ui/components/Modal

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  PropsTransitionChild1,
  PropsTransitionChild2,
} from '../../utils/constants'
import { PropsModal } from '../../utils/interfaces'

export default function Modal({
  title,
  children,
  labelButton,
  show,
  onClose,
}: PropsModal) {
  const [open, setOpen] = useState(show)
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    setOpen(show)
  }, [show])

  const handlerClose = () => {
    setOpen(false)
    onClose(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child as={Fragment} {...PropsTransitionChild1}>
          <div className="fixed inset-0 bg-zinc-100 dark:bg-slate-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child as={Fragment} {...PropsTransitionChild2}>
              <Dialog.Panel className="w-[546px] relative transform overflow-hidden rounded-lg border-solid border-black border-[1px] bg-zinc-100 dark:bg-slate-800 text-left shadow-xl transition-all">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-start">
                    <div className="flex w-full p-[54px] items-center justify-center">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center text-[35px] font-extrabold font-['Roboto'] text-black dark:text-white"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                    <div className="mt-2 w-full text-[35px] font-extrabold font-['Roboto'] text-black dark:text-white">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handlerClose}
                  >
                    {labelButton}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  )
}
