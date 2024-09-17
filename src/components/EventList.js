import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, selectEvent }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <EventCard key={index} event={event} selectEvent={selectEvent} />
      ))}
    </div>
  );
};

export default EventList;
