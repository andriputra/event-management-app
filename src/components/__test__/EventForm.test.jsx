import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventForm from '../EventForm'; 

describe('EventForm Component', () => {
  const mockAddEvent = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockAddEvent.mockClear();
    mockOnClose.mockClear();
  });

  it('should render form fields correctly', () => {
    render(<EventForm addEvent={mockAddEvent} onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/event name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/event category/i)).toBeInTheDocument();
  });

  it('should handle form submission and call addEvent', async () => {
    render(<EventForm addEvent={mockAddEvent} onClose={mockOnClose} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/event name/i), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-09-20' } });
    fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Event description' } });
    fireEvent.change(screen.getByLabelText(/event category/i), { target: { value: 'Tech' } });

    // Submit the form
    fireEvent.click(screen.getByText(/add event/i));

    await waitFor(() => {
      expect(mockAddEvent).toHaveBeenCalledWith({
        name: 'New Event',
        date: '2024-09-20',
        description: 'Event description',
        category: 'Tech',
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should display error message when the date is earlier than today', async () => {
    render(<EventForm addEvent={mockAddEvent} onClose={mockOnClose} />);

    // Set date to a past date
    fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-01-01' } });

    // Submit the form
    fireEvent.click(screen.getByText(/add event/i));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/event date cannot be earlier than today/i)).toBeInTheDocument();
    });
  });

  it('should handle loading state correctly', async () => {
    // Mock addEvent to simulate loading state
    mockAddEvent.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    render(<EventForm addEvent={mockAddEvent} onClose={mockOnClose} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/event name/i), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2024-09-20' } });
    fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'Event description' } });
    fireEvent.change(screen.getByLabelText(/event category/i), { target: { value: 'Tech' } });

    // Submit the form
    fireEvent.click(screen.getByText(/add event/i));

    // Check that the button displays "Loading..."
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // Wait for loading to finish and check button text again
    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });
  });

  it('should call onClose when close button is clicked', () => {
    render(<EventForm addEvent={mockAddEvent} onClose={mockOnClose} />);

    // Click close button
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
