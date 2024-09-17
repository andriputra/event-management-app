import React, { createContext, useState, useContext } from 'react';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState(['All', 'Music', 'Sports', 'Tech']);
    const [filter, setFilter] = useState({ category: 'All', date: null });

  const addEvent = (event) => setEvents([...events, event]);

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const filterEvents = ({ category, date }) => {
    const filtered = events.filter(
      (event) =>
        (category ? event.category === category : true) &&
        (date ? event.date === date : true)
    );
    return filtered;
  };

  return (
    <EventContext.Provider 
        value={{ 
            selectedEvent, 
            selectEvent, 
            events, 
            categories, 
            filter, 
            setFilter, 
            addEvent, 
            filterEvents, 
            setCategories 
        }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;

export const useEventContext = () => {
  return useContext(EventContext);
};
