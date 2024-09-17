import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../HomePage'; // Adjust the import path as needed
import { useEventContext } from '../../context/EventProvider';
import { fetchEvents, createEvent } from '../../api';

// Mock the useEventContext hook
jest.mock('../../context/EventProvider', () => ({
  useEventContext: jest.fn(),
}));

// Mock the API functions
jest.mock('../../api', () => ({
  fetchEvents: jest.fn(),
  createEvent: jest.fn(),
}));

describe('HomePage Component', () => {
  const mockSelectEvent = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should render EventFilter, EventList, and buttons correctly', () => {
    useEventContext.mockReturnValue({
      selectedEvent: null,
      selectEvent: mockSelectEvent,
    });

    render(<HomePage />);

    expect(screen.getByText('Add Event')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Event/i })).toBeInTheDocument();
    expect(screen.getByTestId('event-filter')).toBeInTheDocument();
    expect(screen.getByTestId('event-list')).toBeInTheDocument();
  });

  it('should fetch and display events on mount', async () => {
    useEventContext.mockReturnValue({
      selectedEvent: null,
      selectEvent: mockSelectEvent,
    });

    const mockEvents = [{ name: 'Event 1', date: '2024-09-30', category: 'Music', description: 'Test Event' }];
    fetchEvents.mockResolvedValue({ data: mockEvents });

    render(<HomePage />);

    // Simulate loading events
    await act(async () => {
      await fetchEvents();
    });

    expect(screen.getByText('Event 1')).toBeInTheDocument();
  });

  it('should add a new event and update the list', async () => {
    useEventContext.mockReturnValue({
      selectedEvent: null,
      selectEvent: mockSelectEvent,
    });

    const mockEvents = [{ name: 'Event 1', date: '2024-09-30', category: 'Music', description: 'Test Event' }];
    fetchEvents.mockResolvedValue({ data: mockEvents });
    createEvent.mockResolvedValue({});

    render(<HomePage />);

    fireEvent.click(screen.getByText('Add Event'));

    // Simulate the form submission
    await act(async () => {
      createEvent({ name: 'New Event', date: '2024-10-01', category: 'Tech', description: 'New Event Description' });
      await fetchEvents();
    });

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('New Event')).toBeInTheDocument();
  });

  it('should open and close the EventForm modal', () => {
    useEventContext.mockReturnValue({
      selectedEvent: null,
      selectEvent: mockSelectEvent,
    });

    render(<HomePage />);

    fireEvent.click(screen.getByText('Add Event'));

    expect(screen.getByText('Add New Event')).toBeInTheDocument(); // Assuming EventForm contains this text

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByText('Add New Event')).not.toBeInTheDocument();
  });

  it('should show EventDetails when an event is selected', () => {
    useEventContext.mockReturnValue({
      selectedEvent: { name: 'Selected Event', date: '2024-09-30', category: 'Music', description: 'Selected Event Description' },
      selectEvent: mockSelectEvent,
    });

    render(<HomePage />);

    expect(screen.getByText('Selected Event')).toBeInTheDocument(); // Assuming EventDetails contains this text

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByText('Selected Event')).not.toBeInTheDocument();
  });
});
