import React, { useState, useEffect } from 'react';
import EventFilter from '../components/EventFilter';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import EventDetails from '../components/EventDetails';
import { useEventContext } from '../context/EventProvider';
import { fetchEvents, createEvent } from '../api';

const HomePage = () => {
  const { filterEvents, selectedEvent, selectEvent, setFilter } = useEventContext();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  const handleFilterChange = (filter) => {
    setFilter(filter);
    filterEvents(filter);
  };

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
      await createEvent(event);
      const response = await fetchEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="homepage">
      <div className="filters">
        <EventFilter onFilterChange={handleFilterChange} />
      </div>
      <button onClick={() => setShowModal(true)}>Add Event</button>
      {showModal && <EventForm addEvent={addEvent} onClose={() => setShowModal(false)} />}
      <EventList events={events} selectEvent={selectEvent} />
      {selectedEvent && <EventDetails event={selectedEvent} />}
    </div>
  );
};

export default HomePage;
