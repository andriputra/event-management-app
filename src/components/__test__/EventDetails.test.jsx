import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventDetails from '../EventDetails'; 

// Mock the window.location.reload function
beforeAll(() => {
  global.window = Object.create(window);
  const location = {
    reload: jest.fn(),
  };
  Object.defineProperty(window, 'location', {
    value: location,
    writable: true,
  });
});

describe('EventDetails Component', () => {
  const mockEvent = {
    name: 'Sample Event',
    date: '2024-09-18',
    description: 'Sample description',
    category: 'Music',
  };

  it('should render event details correctly', () => {
    render(<EventDetails event={mockEvent} />);
    
    // Check that the event details are displayed correctly
    expect(screen.getByText('Sample Event')).toBeInTheDocument();
    expect(screen.getByText('2024-09-18')).toBeInTheDocument();
    expect(screen.getByText('Sample description')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  it('should call window.location.reload on close button click', () => {
    render(<EventDetails event={mockEvent} />);
    
    // Find the close button and click it
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    
    // Assert that window.location.reload was called
    expect(window.location.reload).toHaveBeenCalled();
  });
});
