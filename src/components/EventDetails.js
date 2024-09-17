import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 

const EventDetails = ({ event }) => {
  return (
    <div className="modal">
      <div className="modal-content">    
        <div className='modal-header'>
          <h2>{event.name}</h2>
          <span className="close" onClick={() => window.location.reload()} data-testid="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className='description'>
            <p><span>Date</span> <span>{event.date}</span></p>
            <p><span>Description</span> <span>{event.description}</span></p>
            <p><span>Category</span> <span>{event.category}</span></p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;