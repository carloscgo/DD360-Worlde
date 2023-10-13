import {
    render, fireEvent
} from '../../../../../setupTest'
import Keyboard from './';

describe('Keyboard', () => {
    it('calls onKeydown when a key button is clicked', () => {
        const onKeydown = jest.fn();
        const { getByText } = render(<Keyboard onKeydown={onKeydown} />);
        const keyButton = getByText('Q');

        fireEvent.click(keyButton);
        expect(onKeydown).toHaveBeenCalledWith('Q');
    });

    it('calls onKeydown with "Backspace" when backspace button is clicked', () => {
        const onKeydown = jest.fn();
        const { getByAltText } = render(<Keyboard onKeydown={onKeydown} />);
        const backButton = getByAltText('Backspace');

        fireEvent.click(backButton);
        expect(onKeydown).toHaveBeenCalledWith('Backspace');
    });
});
