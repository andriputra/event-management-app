import React from 'react';

const EventModal = ({ event, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <p>{event.date} - {event.category}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventModal;
