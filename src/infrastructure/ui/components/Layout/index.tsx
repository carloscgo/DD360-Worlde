// infrastructure/ui/components/Layout

import Instructions from '../Instructions'
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import MetaTags from '../MetaTags'
import Header from '../Header'
import Statistics from '../Statistics';
import Keyboard from '../Keyboard';
import ThemeProvider from '../ThemeProvider';
import { useIndexDB, readDictionary } from '../../../../application';
import { FiveCharArr, Statistics as StatisticsModel, Status, StatusKeyB, StatusWord, Word, Words } from '../../../../domain/models/Word';
import { Store, MINUTES } from '../../utils/constants';
import Table from '../Table';

export default memo(function Layout() {
  const started = useRef<boolean>(false);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const [showModalI, setShowModalI] = useState<boolean>(false);
  const [showModalS, setShowModalS] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<Word>();
  const [wordsPlayed, setWordsPlayed] = useState<Words>([]);
  const [keysB, setKeysB] = useState<string[]>([]);
  const [statistics, setStatistics] = useState<StatisticsModel>({
    index: 1,
    plays: 0,
    victories: 0,
    timer: MINUTES * 60,
  });

  const {
    getAll: getAllWords,
    addRecord: addRecordWords,
    updateRecord: updateRecordWords,
  } = useIndexDB(Store.Words);

  const {
    getAll: getAllStatistics,
    addRecord: addRecordStatistics,
    updateRecord: updateRecordStatistics,
  } = useIndexDB(Store.Statistics);

  const seekInprogressWord = (words: Words) => {
    return words.find(({ status }) => status === StatusWord.inprogress as Status);
  };

  const seekNewWord = async () => {
    const inprogressWord = seekInprogressWord(wordsPlayed);

    if (!inprogressWord) {
      const word: string = await readDictionary(wordsPlayed);
      const wordMapped: Word = {
        word,
        letters: word.split('').map(char => ({ char, status: StatusKeyB.pending })) as FiveCharArr,
        status: StatusWord.inprogress as Status,
      };

      await addRecordWords(wordMapped);

      setCurrentWord(wordMapped);

      setWordsPlayed(state => ([...state, wordMapped]));
    }
  };

  const countdown = () => {
    timerInterval.current = setInterval(() => {
      getAllStatistics().then(async (data: StatisticsModel[]) => {
        let statisticsData: StatisticsModel = {
          index: 1,
          plays: 0,
          victories: 0,
          timer: MINUTES * 60,
        };

        if (data.length) {
          const timer = data[0].timer - 1;

          statisticsData = {
            ...data[0],
            timer: timer > 0 ? timer : statisticsData.timer,
          };

          if (timer < 1) {
            seekNewWord();
          }

          if (statisticsData.timer > 0) {
            await updateRecordStatistics(statisticsData);
          }
        } else {
          await addRecordStatistics(statisticsData);
        }

        setStatistics(state => ({ ...state, ...statisticsData }));
      });
    }, 1000);
  };

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      countdown();

      clearTimeout(timerTimeout);
    }, 1000);

    return () => {
      if (timerInterval.current !== null) {
        clearInterval(timerInterval.current);
      }
    }
  }, []);

  useEffect(() => {
    if (!started.current) {
      started.current = true;

      getAllWords().then(async (words: Words) => {
        if (words.length) {
          setWordsPlayed(words);

          const inprogressWord = seekInprogressWord(words);

          if (inprogressWord) {
            setCurrentWord(inprogressWord);
          } else {
            await seekNewWord();
          }
        } else {
          setShowModalI(true);
        }
      });
    }
  }, [started.current]);

  const handlerPlay = () => {
    setShowModalI(false);

    const inprogressWord = seekInprogressWord(wordsPlayed);

    if (wordsPlayed.length && inprogressWord) {
      setCurrentWord(inprogressWord);
    } else {
      seekNewWord();

      updateRecordStatistics({
        ...statistics,
        plays: 1,
        timer: MINUTES * 60,
      });
    }
  };

  const handlerFinishTime = useCallback(() => {
    if (currentWord?.word) {
      const wordMapped: Word = {
        ...currentWord,
        status: StatusWord.incomplete as Status,
      };

      setWordsPlayed(state => ([...state, wordMapped]));

      updateRecordWords(wordMapped);

      updateRecordStatistics({
        ...statistics,
        timer: MINUTES * 60,
      });
    }
  }, [currentWord]);

  const handlerCloseStatistics = () => {
    setShowModalS(false);
    seekNewWord();
  };

  const handlerKeydown = (key: string) => {
    if ('QWERTYUIOPASDFGHJKLÑZXCVBNM'.includes(key.toUpperCase())) {
      setKeysB(state => {
        if (state.length < 25) {
          return [...state, key];
        }

        return state;
      });
    }

    if (key === 'Backspace') {
      setKeysB((state) => {
        const letters = [...state];

        letters.pop();

        return letters;
      });
    }
  };

  return (
    <ThemeProvider>
      <MetaTags />

      <div className="w-[100vw] h-[100vh] relative bg-stone-50 dark:bg-slate-800 flex flex-col justify-start items-center mx-auto">
        <Header className='my-[83px]' onInstructions={() => setShowModalI(true)} onStatistics={() => setShowModalS(true)} />

        <Table
          word={currentWord?.word}
          keysB={keysB}
        />

        <Keyboard
          onKeydown={handlerKeydown}
        />

        <Instructions show={showModalI} onClose={handlerPlay} />

        {currentWord?.word}

        <Statistics
          show={showModalS}
          plays={statistics.plays}
          victories={statistics.victories}
          timer={statistics.timer}
          word={currentWord?.word}
          onClose={() => handlerCloseStatistics()}
          onFinishTime={() => handlerFinishTime()}
        />
      </div>
    </ThemeProvider>
  )
})
