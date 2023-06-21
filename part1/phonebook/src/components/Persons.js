import Person from "./Person";

const Persons = ({ displayed }) => {
  return (
    <>
      {displayed.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
};

export default Persons;
