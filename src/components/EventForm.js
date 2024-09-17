import React, { useState } from 'react';

const EventForm = ({ addEvent, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEvent({ name, date, description, category });
    setName('');
    setDate('');
    setDescription('');
    setCategory('');
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Event Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Event Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Sports">Sport</option>
              <option value="Music">Music</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
