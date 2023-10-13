import { ReactNode } from 'react';
import {
    render,
} from '../../../../../setupTest'
import Instructions from './';

interface CustomIntrinsicElements extends JSX.IntrinsicElements {
    'mock-Modal': { children?: ReactNode };
}

jest.mock('../Modal', () => ({
    __esModule: true,
    default: ({ children }: CustomIntrinsicElements['mock-Modal']) => <div>{children}</div>
}))

describe('Instructions', () => {
    it('renders the instructions when show is true', () => {
        const onCloseMock = jest.fn();

        const { getByText, queryByText } = render(
            <Instructions show={true} onClose={onCloseMock} />
        );

        expect(getByText('Adivina la palabra oculta en cinco intentos.')).toBeInTheDocument();
        expect(queryByText('Una palabra nueva cada 5 minutos!')).toBeNull();
    });

    it('does not render the instructions when show is false', () => {
        const onCloseMock = jest.fn();

        const { queryByTestId } = render(
            <Instructions show={false} onClose={onCloseMock} />
        );

        expect(queryByTestId('modal')).toBeNull();
    });
});
