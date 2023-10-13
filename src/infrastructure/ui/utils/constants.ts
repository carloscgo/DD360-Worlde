// infrastructure/ui/utils/constants.ts

export const AppName = 'WORDLE'

export const Status = {
  loading: 'loading',
  success: 'success',
  error: 'error',
}

export const Store = {
  Words: 'words',
  Statistics: 'statistics',
};

export const PropsTransitionChild1 = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
}

export const PropsTransitionChild2 = {
  enter: 'ease-out duration-300',
  enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  enterTo: 'opacity-100 translate-y-0 sm:scale-100',
  leave: 'ease-in duration-200',
  leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
  leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
}

export const MINUTES = 1;
