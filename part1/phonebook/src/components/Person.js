const Person = ({ name, number, id, deletePerson }) => {
  return (
    <p key={name}>
      {name} {number}
      <button onClick={() => deletePerson(id, name)}>delete</button>
    </p>
  );
};

export default Person;
