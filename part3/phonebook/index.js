const express = require("express");
const app = express();

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(people);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${people.length} people</p> <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = people.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  people = people.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const newPerson = req.body;
  if (!newPerson.name) {
    res.status(404).send({ error: "name must not be empty" });
  } else if (!newPerson.number) {
    res.status(404).send({ error: "number must not be empty" });
  } else if (people.some((person) => person.name.includes(newPerson.name))) {
    res.status(404).send({ error: "name must be unique" });
  }
  res.status(200).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
