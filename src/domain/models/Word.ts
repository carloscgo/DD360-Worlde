// domain/models/Word.ts

export type IdWord = string | number;

export type KeyB = {
  char: string
  status?: 'correct' | 'incorrect' | 'notfound' | 'pending'
};

export type FiveCharArr = [KeyB, KeyB, KeyB, KeyB, KeyB];

export type Status = 'incomplete' | 'complete';

export type Word = {
  index: IdWord
  letters: FiveCharArr
  status: Status
};

export type Words = Word[];
