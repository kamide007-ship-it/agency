import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Features from '../../components/Features';

expect.extend(toHaveNoViolations);

describe('Features Component', () => {
  it('renders features section', () => {
    render(<Features theme="light" />);
    const section = screen.getByLabelText('Features');
    expect(section).toBeInTheDocument();
  });

  it('displays section title', () => {
    render(<Features theme="light" />);
    const title = screen.getByText('Why Choose This App?');
    expect(title).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Features theme="light" />);
    const features = [
      'Performance Optimized',
      'Fully Accessible',
      'Modern UI/UX',
      'Well Tested',
      'Mobile First',
      'Type Safe',
    ];

    features.forEach((featureName) => {
      expect(screen.getByText(featureName)).toBeInTheDocument();
    });
  });

  it('renders feature descriptions', () => {
    render(<Features theme="light" />);
    const descriptions = screen.getAllByText(/Code splitting|WCAG|Responsive|Jest|Optimized|TypeScript/);
    expect(descriptions.length).toBeGreaterThan(0);
  });

  it('uses article elements for feature cards', () => {
    render(<Features theme="light" />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(6);
  });

  it('has icons marked as aria-hidden for decorative icons', () => {
    render(<Features theme="light" />);
    const decorativeIcons = document.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeIcons.length).toBeGreaterThan(0);
  });

  it('applies light theme styling', () => {
    render(<Features theme="light" />);
    const section = screen.getByLabelText('Features');
    expect(section).toHaveClass('bg-white');
  });

  it('applies dark theme styling', () => {
    render(<Features theme="dark" />);
    const section = screen.getByLabelText('Features');
    expect(section).toHaveClass('bg-gray-900');
  });

  it('uses responsive grid layout', () => {
    render(<Features theme="light" />);
    const featureGrid = document.querySelector(
      '[class*="grid"]'
    );
    expect(featureGrid).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Features theme="light" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper semantic heading structure', () => {
    render(<Features theme="light" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Why Choose This App?');
  });
});
