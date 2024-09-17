const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let events = [];

// GET all events
app.get('/events', (req, res) => {
    const { category, date } = req.query;

    // Filter events based on query parameters
    const filteredEvents = events.filter(event => {
        return (!category || category === 'All' || event.category === category) &&
                (!date || event.date === date);
    });

    res.json(filteredEvents);
    res.json(events);
});

// POST a new event
app.post('/events', (req, res) => {
  const { name, date, description, category } = req.body;
  const newEvent = { id: Date.now(), name, date, description, category };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
