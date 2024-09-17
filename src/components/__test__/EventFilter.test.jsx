import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventFilter from '../EventFilter';  // Adjust the import path as needed

describe('EventFilter Component', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('should render correctly with initial state', () => {
    render(<EventFilter onFilterChange={mockOnFilterChange} />);

    // Check initial state of inputs
    expect(screen.getByLabelText(/category/i).value).toBe('All');
    expect(screen.getByLabelText(/date/i).value).toBe('');
  });

  it('should call onFilterChange with selected values when filter button is clicked', () => {
    render(<EventFilter onFilterChange={mockOnFilterChange} />);

    // Change category and date values
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Music' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-09-18' } });

    // Click filter button
    fireEvent.click(screen.getByText(/filter event/i));

    // Check that onFilterChange was called with correct values
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: 'Music', date: '2024-09-18' });
  });

  it('should reset category and date when reset button is clicked', () => {
    render(<EventFilter onFilterChange={mockOnFilterChange} />);

    // Set values
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Tech' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-10-01' } });

    // Click reset button
    fireEvent.click(screen.getByRole('button', { name: /arrows rotate/i }));

    // Check that inputs are reset
    expect(screen.getByLabelText(/category/i).value).toBe('All');
    expect(screen.getByLabelText(/date/i).value).toBe('');

    // Check that onFilterChange was called with default values
    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: 'All', date: '' });
  });
});
