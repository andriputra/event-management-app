import React, { createContext, useState } from 'react';

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(['All', 'Conference', 'Meetup']);
  const [filter, setFilter] = useState({ category: 'All', date: null });

  const addEvent = (event) => setEvents([...events, event]);

  return (
    <EventContext.Provider value={{ events, categories, filter, setFilter, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
