import classes from "./App.css";
import Filter from "./components/FIlter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import { useState, useEffect } from "react";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [statusMsg, setStatusMsg] = useState({ status: null, message: null });

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
      setStatusMsg({ status: "success", message: `Added ${newName}` });
      setTimeout(() => setStatusMsg({ status: null, message: null }), 5000);
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
        phonebookService
          .update(existingPerson.id, existingPerson.name, newNumber)
          .then((res) => setPersons([...unchangedPeople, res]))
          .catch(() => {
            setStatusMsg({
              status: "error",
              message: `Information of ${existingPerson.name} has already been removed from server`,
            });
            setTimeout(() => {
              setStatusMsg({ status: null, message: null });
            }, 5000);
          });
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
      <Notification status={statusMsg} />
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
