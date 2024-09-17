import React from 'react';

const EventCard = ({ event, selectEvent }) => {
  return (
    <div className="event-card" onClick={() => selectEvent(event)}>
      <h2>{event.name}</h2>
      <p>Date: {event.date}</p>
      <p>Description: {event.description}</p>
      <p>Category: {event.category}</p>
    </div>
  );
};

export default EventCard;