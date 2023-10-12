// infrastructure/ui/components/Layout

import Instructions from '../Instructions'
import { useEffect, useState } from 'react';
import MetaTags from '../MetaTags'
import Header from '../Header'
import Statistics from '../Statistics';
import Keyboard from '../Keyboard';
import ThemeProvider from '../ThemeProvider';
import { initDB, configDB, useIndexDB, readDictionary } from '../../../../application';

initDB(configDB);

export default function Layout() {
  const [showModalI, setShowModalI] = useState<boolean>(false);
  const [showModalS, setShowModalS] = useState<boolean>(false);

  const { getAll, addRecord } = useIndexDB();

  useEffect(() => {
    getAll().then((words) => {
      if (!words.length) {
        setShowModalI(true);
      }
    });

    readDictionary().then(words => words.forEach(word => addRecord(word, 'dictionary')));
  }, []);

  const handlerJugar = () => {
    setShowModalI(false);

    getAll().then((words) => {
      if (!words.length) {
        addRecord({
          letters: 'perro'.split('').map(char => ({ char, status: 'pending' })),
          status: 'incomplete',
        });
      }
    });
  };

  return (
    <ThemeProvider>
      <MetaTags />

      <div className="w-[100vw] h-[100vh] relative bg-stone-50 dark:bg-slate-800 flex flex-col justify-start items-center mx-auto">
        <Header className='my-[83px]' onInstructions={() => setShowModalI(true)} onStatistics={() => setShowModalS(true)} />

        <Keyboard />

        <Instructions show={showModalI} onClose={handlerJugar} />

        <Statistics show={showModalS} plays={8} victories={2} word='perro' timer={20} onClose={() => setShowModalS(false)} />
      </div>
    </ThemeProvider>
  )
}
