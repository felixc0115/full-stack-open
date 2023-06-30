const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return null;
  }
  return (
    <div>
      {countries.map((country) => (
        <p key={country.area}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default Countries;
