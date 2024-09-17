import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventProvider, { EventContext } from '../EventContext';
const TestComponent = () => {
  const { events, categories, filter, setFilter, addEvent, setCategories } = React.useContext(EventContext);

  // For testing purposes, expose some internal functionality
  return (
    <div>
      <button onClick={() => addEvent({ name: 'New Event', date: '2024-09-30', category: 'Music', description: 'Test Event' })}>
        Add Event
      </button>
      <button onClick={() => setFilter({ category: 'Music', date: '2024-09-30' })}>
        Set Filter
      </button>
      <button onClick={() => setCategories(['All', 'Music', 'Sports'])}>
        Set Categories
      </button>
      <div data-testid="events">{JSON.stringify(events)}</div>
      <div data-testid="categories">{JSON.stringify(categories)}</div>
      <div data-testid="filter">{JSON.stringify(filter)}</div>
    </div>
  );
};

describe('EventProvider Component', () => {
  it('should provide initial context values correctly', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    expect(screen.getByTestId('events')).toBeEmptyDOMElement();
    expect(screen.getByTestId('categories')).toHaveTextContent(JSON.stringify(['All', 'Music', 'Sports', 'Tech']));
    expect(screen.getByTestId('filter')).toHaveTextContent(JSON.stringify({ category: 'All', date: null }));
  });

  it('should update events when addEvent is called', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    act(() => {
      screen.getByText('Add Event').click();
    });

    expect(screen.getByTestId('events')).toHaveTextContent(JSON.stringify([{ name: 'New Event', date: '2024-09-30', category: 'Music', description: 'Test Event' }]));
  });

  it('should update filter when setFilter is called', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    act(() => {
      screen.getByText('Set Filter').click();
    });

    expect(screen.getByTestId('filter')).toHaveTextContent(JSON.stringify({ category: 'Music', date: '2024-09-30' }));
  });

  it('should update categories when setCategories is called', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    act(() => {
      screen.getByText('Set Categories').click();
    });

    expect(screen.getByTestId('categories')).toHaveTextContent(JSON.stringify(['All', 'Music', 'Sports']));
  });
});
