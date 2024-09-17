import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div className="event-details">
      <div className="event-details-content">
        <h2>{event.name}</h2>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <p>Category: {event.category}</p>
        <button onClick={() => window.location.reload()}>Close</button>
      </div>
    </div>
  );
};

export default EventDetails;
