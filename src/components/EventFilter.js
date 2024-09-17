import React from 'react';

const EventFilter = ({ onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="event-filter">
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Tech">Tech</option>
      </select>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" onChange={handleChange} />
    </div>
  );
};

export default EventFilter;
