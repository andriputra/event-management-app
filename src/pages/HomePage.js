import React, { useState, useEffect } from 'react';
import EventFilter from '../components/EventFilter';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import EventDetails from '../components/EventDetails';
import { useEventContext } from '../context/EventProvider';
import { fetchEvents, createEvent } from '../api';

const HomePage = () => {
  const { filter, setFilter, selectEvent, selectedEvent } = useEventContext();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { category, date } = filter;
        const response = await fetchEvents(category, date);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    loadEvents();
  }, [filter]);

  const addEvent = async (event) => {
    try {
      await createEvent(event);
      // Re-fetch events after adding a new event
      const { category, date } = filter;
      const response = await fetchEvents(category, date);
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="homepage">
      <div className="filters">
        <EventFilter onFilterChange={handleFilterChange} />
        <button className='btn-prime' onClick={() => setShowModal(true)}>Add Event</button>
      </div>
      {showModal && <EventForm addEvent={addEvent} onClose={() => setShowModal(false)} />}
      <EventList events={events} selectEvent={selectEvent} />
      {selectedEvent && <EventDetails event={selectedEvent} onClose={() => selectEvent(null)} />}
    </div>
  );
};

export default HomePage;