import {
    render,
} from '../../../../../setupTest'
import Points from './';

describe('Points', () => {
    it('renders the correct value and label', () => {
        const value = 10;
        const label = 'Points';
        const { getByText } = render(<Points value={value} label={label} />);

        const valueElement = getByText(value.toString());
        const labelElement = getByText(label);

        expect(valueElement).toBeInTheDocument();
        expect(labelElement).toBeInTheDocument();
    });
});
