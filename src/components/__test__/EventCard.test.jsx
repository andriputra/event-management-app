import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from '../EventCard'; 

describe('EventCard', () => {
  const mockSelectEvent = jest.fn();

  const event = {
    name: 'Sample Event',
    date: '2024-09-18',
    description: 'This is a sample event description.',
    category: 'Music',
  };

  test('renders event details correctly', () => {
    render(<EventCard event={event} selectEvent={mockSelectEvent} />);

    // Check if event details are rendered
    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByText(`Date: ${event.date}`)).toBeInTheDocument();
    expect(screen.getByText(`Description: ${event.description}`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${event.category}`)).toBeInTheDocument();
  });

  test('calls selectEvent with event data on click', () => {
    render(<EventCard event={event} selectEvent={mockSelectEvent} />);

    // Simulate click
    fireEvent.click(screen.getByText(event.name));

    // Assert that selectEvent is called with the correct event
    expect(mockSelectEvent).toHaveBeenCalledWith(event);
    expect(mockSelectEvent).toHaveBeenCalledTimes(1);
  });
});
