import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventList from '../EventList';  
import EventCard from '../EventCard'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faMusic, faMicrochip } from '@fortawesome/free-solid-svg-icons';

// Mock EventCard component
jest.mock('../EventCard', () => ({ event, selectEvent }) => (
  <div data-testid="event-card">
    <h2>{event.name}</h2>
    <div>{event.date}</div>
    <div>{event.description}</div>
    <div>{event.category}</div>
  </div>
));

describe('EventList Component', () => {
  const mockSelectEvent = jest.fn();
  
  const events = [
    { name: 'Event 1', date: '2024-09-20', description: 'Sports event', category: 'Sports' },
    { name: 'Event 2', date: '2024-09-21', description: 'Music event', category: 'Music' },
    { name: 'Event 3', date: '2024-09-22', description: 'Tech event', category: 'Tech' },
  ];

  it('should render EventList with events', () => {
    render(<EventList events={events} selectEvent={mockSelectEvent} />);
    
    events.forEach(event => {
      expect(screen.getByText(event.name)).toBeInTheDocument();
      expect(screen.getByText(event.date)).toBeInTheDocument();
      expect(screen.getByText(event.description)).toBeInTheDocument();
      expect(screen.getByText(event.category)).toBeInTheDocument();
    });
  });

  it('should apply correct category class and icon', () => {
    render(<EventList events={events} selectEvent={mockSelectEvent} />);

    events.forEach(event => {
      const categoryClass = `event-${event.category.toLowerCase()}`;
      expect(screen.getByText(event.name).closest('.event-wrapper')).toHaveClass(categoryClass);
      
      let icon;
      switch (event.category) {
        case 'Sports':
          icon = faPersonRunning;
          break;
        case 'Music':
          icon = faMusic;
          break;
        case 'Tech':
          icon = faMicrochip;
          break;
        default:
          icon = null;
      }
      if (icon) {
        expect(screen.getByText(event.name).closest('.event-wrapper').querySelector('svg')).toHaveAttribute('data-icon', icon.iconName);
      }
    });
  });

  it('should render EventCard component for each event', () => {
    render(<EventList events={events} selectEvent={mockSelectEvent} />);
    
    events.forEach(event => {
      expect(screen.getByTestId('event-card')).toHaveTextContent(event.name);
      expect(screen.getByTestId('event-card')).toHaveTextContent(event.date);
      expect(screen.getByTestId('event-card')).toHaveTextContent(event.description);
      expect(screen.getByTestId('event-card')).toHaveTextContent(event.category);
    });
  });
});
