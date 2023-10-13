import {
    render,
    fireEvent,
} from '../../../../../setupTest'
import Header from './';

describe('Header', () => {
    it('renders the header with default props', () => {
        const onInstructionsMock = jest.fn();
        const onStatisticsMock = jest.fn();

        const { getByLabelText, getAllByRole } = render(
            <Header onInstructions={onInstructionsMock} onStatistics={onStatisticsMock} />
        );

        expect(getByLabelText('Header')).toBeInTheDocument();
        expect(getAllByRole('button')[0]).toBeInTheDocument();
        expect(getAllByRole('button')[1]).toBeInTheDocument();
    });

    it('calls the onInstructions prop when the instructions button is clicked', () => {
        const onInstructionsMock = jest.fn();
        const onStatisticsMock = jest.fn();

        const { getAllByRole } = render(
            <Header onInstructions={onInstructionsMock} onStatistics={onStatisticsMock} />
        );

        fireEvent.click(getAllByRole('button')[0]);

        expect(onInstructionsMock).toHaveBeenCalledTimes(1);
    });

    it('calls the onStatistics prop when the statistics button is clicked', () => {
        const onInstructionsMock = jest.fn();
        const onStatisticsMock = jest.fn();

        const { getAllByRole } = render(
            <Header onInstructions={onInstructionsMock} onStatistics={onStatisticsMock} />
        );

        fireEvent.click(getAllByRole('button')[1]);

        expect(onStatisticsMock).toHaveBeenCalledTimes(1);
    });
});
