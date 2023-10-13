import {
    render, fireEvent
} from '../../../../../setupTest'
import KeyB from './';

describe('KeyB', () => {
    const defaultProps: any = {
        children: 'Button',
        onClick: jest.fn(),
        color: 'green',
        isKey: true,
    };

    it('renders with default props', () => {
        const { getByText } = render(<KeyB {...defaultProps} />);
        const button = getByText('Button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('min-w-[44.67px] h-[51px] flex items-center justify-center bg-neutral-500 dark:bg-neutral-500 text-black dark:text-white px-[10.5px] rounded-[5px] text-[18px] font-semibold');
    });

    it('calls onClick when clicked', () => {
        const { getByText } = render(<KeyB {...defaultProps} />);
        const button = getByText('Button');

        fireEvent.click(button);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
});
