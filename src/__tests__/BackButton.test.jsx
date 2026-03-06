import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BackButton from '../components/UI/BackButton';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('BackButton', () => {
    it('renders correctly with "Home" text', () => {
        render(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('navigates to "/" when clicked', () => {
        render(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByRole('button'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
