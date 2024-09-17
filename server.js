const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csurf({ cookie: true }));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// Include CSRF token in responses
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

let events = [];
// Example of including CSRF token in your form responses
app.get('/form', (req, res) => {
    res.json({ csrfToken: res.locals.csrfToken });
});

// GET all events
app.get('/events', (req, res) => {
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
