import { ReactNode } from 'react';
import {
    render,
} from '../../../../../setupTest'
import Statistics from './';

interface CustomIntrinsicElements extends JSX.IntrinsicElements {
    'mock-Modal': { children?: ReactNode };
}

jest.mock('../Modal', () => ({
    __esModule: true,
    default: ({ children }: CustomIntrinsicElements['mock-Modal']) => <div>{children}</div>
}))

describe('Statistics', () => {
    it('renders the correct values and labels', () => {
        const plays = 10;
        const victories = 5;
        const timer = 0;
        const word = 'apple';
        const show = true;
        const onClose = jest.fn();
        const onFinishTime = jest.fn();

        const { getByText, queryByText } = render(
            <Statistics
                show={show}
                plays={plays}
                victories={victories}
                timer={timer}
                word={word}
                onClose={onClose}
                onFinishTime={onFinishTime}
            />
        );

        const playsPoints = getByText(plays.toString());
        const victoriesPoints = getByText(victories.toString());
        const wordElement = getByText(`La palabra era:`);
        const timeLeftElement = getByText('00:00');

        expect(playsPoints).toBeInTheDocument();
        expect(victoriesPoints).toBeInTheDocument();
        expect(wordElement).toBeInTheDocument();
        expect(timeLeftElement).toBeInTheDocument();
        expect(queryByText('SIGUIENTE PALABRA')).toBeInTheDocument();
    });
});
