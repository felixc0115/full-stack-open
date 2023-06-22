import "./App.css";
import Filter from "./components/FIlter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const baseURL = "http://localhost:3001/persons";

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setPersons(res.data);
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
      axios.post(baseURL, newPerson).then((res) => {
        setPersons([...persons, newPerson]);
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
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
      <Persons displayed={displayed} />
    </div>
  );
};

export default App;
