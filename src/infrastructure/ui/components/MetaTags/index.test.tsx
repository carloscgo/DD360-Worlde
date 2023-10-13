import { ReactNode } from 'react';
import {
    render,
} from '../../../../../setupTest'
import { AppName } from '../../utils/constants';
import MetaTags from './';

interface CustomIntrinsicElements extends JSX.IntrinsicElements {
    'mock-Helmet': { children?: ReactNode };
}

jest.mock('react-helmet-async', () => ({
    Helmet: ({ children }: CustomIntrinsicElements['mock-Helmet']) => <div>{children}</div>
}))

describe('MetaTags', () => {
    it('renders with default title if no title prop is provided', () => {
        const { getByText } = render(<MetaTags />);
        const titleElement = getByText(AppName);

        expect(titleElement).toBeInTheDocument();
    });

    it('renders with provided title', () => {
        const { getByText } = render(<MetaTags title="Custom Title" />);
        const titleElement = getByText('Custom Title');

        expect(titleElement).toBeInTheDocument();
    });

    it('renders meta tags with appropriate content', () => {
        render(<MetaTags />);

        expect(document.title).toBe(AppName);
        expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', AppName);
        expect(document.querySelector('meta[name="viewport"]')).toHaveAttribute('content', 'width=device-width, initial-scale=1');
        expect(document.querySelector('link[rel="icon"]')).toHaveAttribute('href', '/favicon.ico');
    });
});
