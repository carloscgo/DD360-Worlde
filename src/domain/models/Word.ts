// domain/models/Word.ts

export const StatusWord = {
  incomplete: 'incomplete',
  complete: 'complete',
  inprogress: 'inprogress',
};

export const StatusKeyB = {
  correct: 'correct',
  incorrect: 'incorrect',
  notfound: 'notfound',
  pending: 'pending',
};

export type IdWord = string | number;

export type KeyB = {
  char: string
  status?: keyof typeof StatusKeyB
};

export type FiveCharArr = [KeyB, KeyB, KeyB, KeyB, KeyB];

export type Status = keyof typeof StatusWord;

export type Word = {
  index?: IdWord
  letters: FiveCharArr
  word: string
  status: Status
};

export type Words = Word[];

export type Statistics = {
  index: number
  plays: number,
  victories: number,
  timer: number,
};
