// infrastructure/ui/components/Layout

import Instructions from '../Instructions'
import { useState } from 'react';
import MetaTags from '../MetaTags'
import Header from '../Header'
import Statistics from '../Statistics';

export default function Layout() {
  const [showModalI, setShowModalI] = useState<boolean>(false);
  const [showModalS, setShowModalS] = useState<boolean>(false);

  return (
    <>
      <MetaTags />

      <div className="w-[100vw] h-[100vh] relative bg-stone-50 dark:bg-slate-800 flex justify-center mx-auto">
        <Header className='my-[83px]' />

        <Instructions show={showModalI} />

        <Statistics show={showModalS} plays={8} victories={2} word='perro' timer={20} />

        <button onClick={() => setShowModalI(state => !state)}>modal 1</button>
        <button onClick={() => setShowModalS(state => !state)}>modal 2</button>
      </div>
    </>
  )
}
