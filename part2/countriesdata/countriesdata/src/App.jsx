import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch countries data
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data));
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const result = countries.filter(country =>
      country.name.common.toLowerCase().includes(query)
    );
    setFiltered(result);
  };

  return (
    <div>
      <h1>Country Finder</h1>
      <input type="text" value={search} onChange={handleSearch} placeholder="Search country..." />
      <CountryList countries={filtered} />
    </div>
  );
};

export default App;
