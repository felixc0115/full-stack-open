const PersonForm = ({
  newName,
  nameChangeHandler,
  newNumber,
  numberChangeHandler,
  submitHandler,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChangeHandler} />
      </div>
      <div>
        <button onClick={submitHandler} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
