import Weather from "./Weather";

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km²</p>
      <p><b>Languages:</b></p>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} width="150" />
      <Weather capital={country.capital} />
    </div>
  );
};

export default CountryDetails;
