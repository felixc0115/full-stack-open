const Countries = ({ countries, setCountry }) => {
  if (countries.length === 1) {
    return null;
  }
  return (
    <div>
      {countries.map((country) => (
        <p key={country.area}>
          {country.name.common}{" "}
          <button onClick={() => setCountry([country])}>show</button>
        </p>
      ))}
    </div>
  );
};

export default Countries;
