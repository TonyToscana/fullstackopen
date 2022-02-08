const app = require('express')();

const PORT = 3002;
const data = [
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
