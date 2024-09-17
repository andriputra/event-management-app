import { useState, useEffect } from 'react';
import { fetchEvents, createEvent } from '../api';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    loadEvents();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await createEvent(event);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const filterEvents = ({ category, date }) => {
    const filtered = events.filter(
      (event) =>
        (category ? event.category === category : true) &&
        (date ? event.date === date : true)
    );
    setFilteredEvents(filtered);
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  return {
    events: filteredEvents.length > 0 ? filteredEvents : events,
    addEvent,
    filterEvents,
    selectedEvent,
    selectEvent,
  };
};
