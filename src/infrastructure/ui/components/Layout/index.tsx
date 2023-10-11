// infrastructure/ui/components/Layout

import MetaTags from '../MetaTags'
import Header from '../Header'
import Instructions from '../Instructions'
import { useState } from 'react';

export default function Layout() {
  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <>
      <MetaTags />

      <div className="w-[100vw] h-[100vh] relative bg-stone-50 dark:bg-slate-800 flex justify-center mx-auto">
        <Header className='my-[83px]' />

        <Instructions show={showModal} />

        <button onClick={() => setShowModal(state => !state)}>modal</button>
      </div>
    </>
  )
}
