import Person from "./Person";

const Persons = ({ displayed, deletePerson }) => {
  return (
    <>
      {displayed.map((person) => (
        <Person
          deletePerson={deletePerson}
          id={person.id}
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </>
  );
};

export default Persons;
