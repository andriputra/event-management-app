import React, { createContext, useState, useContext, useEffect } from 'react';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories] = useState(['All', 'Music', 'Sports', 'Tech']);
  const [filter, setFilter] = useState({ category: 'All', date: '' });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    filterEvents(filter);
  }, [filter, events]);

  const addEvent = (event) => setEvents([...events, event]);

  const filterEvents = ({ category, date }) => {
    let filtered = events;

    if (category && category !== 'All') {
      filtered = filtered.filter(event => event.category === category);
    }
    
    if (date) {
      filtered = filtered.filter(event => event.date === date);
    }

    setFilteredEvents(filtered);
  };

  const selectEvent = (event) => setSelectedEvent(event);

  return (
    <EventContext.Provider value={{ 
      events: filteredEvents.length > 0 ? filteredEvents : events,
      categories,
      filter,
      setFilter,
      addEvent,
      filterEvents,
      selectEvent,
      selectedEvent 
    }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;

export const useEventContext = () => {
  return useContext(EventContext);
};