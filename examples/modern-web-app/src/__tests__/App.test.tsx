import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';

expect.extend(toHaveNoViolations);

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('renders header with agency app title', () => {
    render(<App />);
    const title = screen.getByText('Agency App');
    expect(title).toBeInTheDocument();
  });

  it('renders main content area with proper role', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('has skip to main content link', () => {
    render(<App />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass('sr-only');
  });

  it('toggles theme between light and dark', async () => {
    const user = userEvent.setup();
    render(<App />);

    const themeButton = screen.getByRole('button', {
      name: /switch to dark mode/i,
    });

    expect(themeButton).toHaveTextContent('🌙');

    await user.click(themeButton);

    const themeButtonDark = screen.getByRole('button', {
      name: /switch to light mode/i,
    });
    expect(themeButtonDark).toHaveTextContent('☀️');
  });

  it('has proper accessibility structure', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('maintains semantic HTML structure', () => {
    render(<App />);

    // Check for semantic sections
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });

  it('has application role on root div', () => {
    render(<App />);
    const appDiv = screen.getByRole('application');
    expect(appDiv).toBeInTheDocument();
  });

  it('theme button has correct aria-pressed attribute', () => {
    render(<App />);
    const themeButton = screen.getByRole('button');

    expect(themeButton).toHaveAttribute('aria-pressed', 'false');
  });
});
