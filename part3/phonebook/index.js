require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

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
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${people.length} people</p> <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id).then((result) =>
    res.status(204).end()
  );
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });

  person.save().then((result) => {
    res.json(result);
    console.log(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
