import "./App.css";

import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setPersons(persons.concat({ name: newName }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
  };

  const nameChangeHandler = (e) => setNewName(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={nameChangeHandler} />
        </div>
        <div>
          <button onClick={submitHandler} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
