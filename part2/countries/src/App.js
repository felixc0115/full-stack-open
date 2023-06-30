import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data));
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setCountriesToDisplay(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        find countries <input onChange={searchHandler} type="text" />
      </div>
      {countriesToDisplay.length === 1 ? (
        <Country country={countriesToDisplay[0]} />
      ) : null}
      {countriesToDisplay.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <Countries countries={countriesToDisplay} />
      )}
    </div>
  );
}

export default App;
