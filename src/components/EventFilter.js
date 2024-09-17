import React, { useState, useEffect } from 'react';

const EventFilter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('All');
  const [date, setDate] = useState('');

  useEffect(() => {
    onFilterChange({ category, date });
  }, [category, date, onFilterChange]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFilter = () => {
    onFilterChange({ category, date });
  };

  return (
    <div className="event-filter">
      <label htmlFor="category">Category:</label>
      <select name="category" id="category" value={category} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        <option value="Music">Music</option>
        <option value="Sports">Sports</option>
        <option value="Tech">Tech</option>
      </select>

      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" value={date} onChange={handleDateChange} />

      <button className='btn-prime filter' onClick={handleFilter}>Filter Event</button>
    </div>
  );
};

export default EventFilter;
