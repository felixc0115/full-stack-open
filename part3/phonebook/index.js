const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

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

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "Content-Length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.use(express.static("build"));

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
  } else {
    res.status(200).json(newPerson);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
