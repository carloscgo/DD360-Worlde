import {
    render,
    fireEvent,
} from '../../../../../setupTest'
import ButtonTheme from './';

describe('ButtonTheme', () => {
    it('renders correctly', () => {
        const { getByRole } = render(
            <ButtonTheme type="light" onChange={() => { }} />
        );

        const button = getByRole('button');
        expect(button).toBeInTheDocument();

        expect(button).toHaveClass('light cursor-pointer');
        expect(button).toHaveAttribute('aria-label', 'light icon');

        const image = getByRole('img');
        expect(image).toHaveAttribute('src', '/images/theme-light.svg');
    });

    it('calls onChange when clicked', () => {
        const onChangeMock = jest.fn();
        const { getByRole } = render(
            <ButtonTheme type="dark" onChange={onChangeMock} />
        );

        const button = getByRole('button');
        fireEvent.click(button);

        expect(onChangeMock).toHaveBeenCalled();
    });
});
