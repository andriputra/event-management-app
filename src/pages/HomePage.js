import React, { useState, useEffect } from 'react';
import EventFilter from '../components/EventFilter';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import EventDetails from '../components/EventDetails';
import { useEventContext } from '../context/EventProvider';
import { fetchEvents, createEvent } from '../api';

const HomePage = () => {
  const { selectedEvent, selectEvent } = useEventContext();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ category: 'All', date: '' });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents(filters.category, filters.date);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    loadEvents();
  }, [filters]);

  const addEvent = async (event) => {
    try {
      await createEvent(event);
      const response = await fetchEvents(filters.category, filters.date); 
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="homepage">
      <div className="filters">
        <EventFilter onFilterChange={onFilterChange} />
        <button className='btn-prime' onClick={() => setShowModal(true)}>Add Event</button>
      </div>
      {showModal && <EventForm addEvent={addEvent} onClose={() => setShowModal(false)} />}
      <EventList events={events} selectEvent={selectEvent} />
      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => selectEvent(null)} />}
    </div>
  );
};

export default HomePage;
