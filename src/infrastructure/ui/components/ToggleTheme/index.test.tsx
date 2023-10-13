import {
    render,
    fireEvent
} from '../../../../../setupTest'
import ToggleTheme from './';

describe('ToggleTheme', () => {
    it('should toggle theme when a button is clicked', () => {
        const mockOnChange = jest.fn();
        const { getAllByRole } = render(<ToggleTheme onChange={mockOnChange} />);

        const darkButton = getAllByRole('button')[0];
        const lightButton = getAllByRole('button')[1];

        expect(document.documentElement.classList).toContain('light');
        expect(darkButton.className).not.toContain('hidden');
        expect(lightButton.className).toContain('hidden');

        fireEvent.click(darkButton);

        expect(document.documentElement.classList).toContain('dark');
        expect(darkButton.className).toContain('hidden');
        expect(lightButton.className).not.toContain('hidden');
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith('dark');

        fireEvent.click(lightButton);

        expect(document.documentElement.classList).toContain('light');
        expect(darkButton.className).not.toContain('hidden');
        expect(lightButton.className).toContain('hidden');
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith('light');
    });
});
