import { useState } from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length > 10) {
    return <p>Too many matches, refine your search.</p>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common} 
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default CountryList;
