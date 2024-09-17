import React from 'react';
import EventCard from './EventCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faMusic, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const EventList = ({ events, selectEvent }) => {
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Sports':
        return 'event-sports';
      case 'Music':
        return 'event-music';
      case 'Tech':
        return 'event-tech';
      default:
        return '';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Sports':
        return <FontAwesomeIcon icon={faPersonRunning} />;
      case 'Music':
        return <FontAwesomeIcon icon={faMusic} />;
      case 'Tech':
        return <FontAwesomeIcon icon={faMicrochip} />;
      default:
        return null;
    }
  };

  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div
          key={index}
          className={`event-wrapper ${getCategoryClass(event.category)}`}
        >
          {getCategoryIcon(event.category)} 
          <EventCard event={event} selectEvent={selectEvent}/>  
        </div>
      ))}
    </div>
  );
};

export default EventList;
