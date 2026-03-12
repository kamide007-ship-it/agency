import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Header from '../../components/Header';

expect.extend(toHaveNoViolations);

describe('Header Component', () => {
  const mockOnThemeToggle = jest.fn();

  beforeEach(() => {
    mockOnThemeToggle.mockClear();
  });

  it('renders header with proper role', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('displays agency app title', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const title = screen.getByText('Agency App');
    expect(title).toBeInTheDocument();
  });

  it('has navigation with aria-label', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon in light theme', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🌙');
  });

  it('shows sun icon in dark theme', () => {
    render(<Header theme="dark" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('☀️');
  });

  it('calls onThemeToggle when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnThemeToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label for theme button in light mode', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has correct aria-label for theme button in dark mode', () => {
    render(<Header theme="dark" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('has focus styles for keyboard navigation', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:ring-2', 'focus:outline-none');
  });

  it('applies correct styling in dark theme', () => {
    render(<Header theme="dark" onThemeToggle={mockOnThemeToggle} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-gray-800');
  });

  it('applies correct styling in light theme', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Header theme="light" onThemeToggle={mockOnThemeToggle} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('maintains sticky positioning', () => {
    render(<Header theme="light" onThemeToggle={mockOnThemeToggle} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-40');
  });
});
