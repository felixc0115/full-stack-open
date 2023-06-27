import "./App.css";
import Filter from "./components/FIlter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { useState, useEffect } from "react";
import phonebookService from "./services/phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      const newPerson = { name: newName, number: newNumber };

      phonebookService.create(newPerson).then((res) => {
        setPersons([...persons, res]);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name === newName
        );
        const unchangedPeople = persons.filter(
          (person) => person.id !== existingPerson.id
        );
        console.log(unchangedPeople);
        phonebookService
          .update(existingPerson.id, existingPerson.name, newNumber)
          .then((res) => setPersons([...unchangedPeople, res]));
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      phonebookService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const nameChangeHandler = (e) => setNewName(e.target.value);
  const numberChangeHandler = (e) => setNewNumber(e.target.value);
  const filterChangeHandler = (e) => setFilter(e.target.value.toLowerCase());

  const displayed = filter
    ? persons.filter((person) => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
      <h2>add a new</h2>
      <PersonForm
        nameChangeHandler={nameChangeHandler}
        numberChangeHandler={numberChangeHandler}
        newName={newName}
        newNumber={newNumber}
        submitHandler={submitHandler}
      />

      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} displayed={displayed} />
    </div>
  );
};

export default App;
