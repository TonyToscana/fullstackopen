const express = require('express');
const app = express();

const PORT = 3002;
let data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000000);
};

app.use(express.json());

app.get('/info', (req, res) => {
  res.send(
    `Phonebook has info for ${data.length} people <br /> <br />${new Date()}`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(data);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((per) => per.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = `Person not found with id ${id}`;
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((per) => per.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  }

  if (data.findIndex((p) => p.name === body.name) >= 0) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  data = data.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
