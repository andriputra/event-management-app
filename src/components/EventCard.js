import React from 'react';

const EventCard = ({ event, selectEvent }) => {
  return (
    <div className="event-card" onClick={() => selectEvent(event)}>
      <h2>{event.name}</h2>
      <div className='event-card-detail'>
        <p><span>Date:</span> <span>{event.date}</span></p>
        <p><span>Description:</span> <span>{event.description}</span></p>
        <p><span>Category:</span> <span>{event.category}</span></p>
      </div>
    </div>
  );
};

export default EventCard;