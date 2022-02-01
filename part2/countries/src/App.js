import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <div>{country.name.common}</div>
      ))}
    </>
  );
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((lan) => (
          <li>{lan}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt="Country flag"
        height={100}
        width={100}
      />
    </div>
  );
};

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountryList(response.data);
    });
  }, []);

  const filteredList = countryList.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  const decideRender = (list) => {
    if (list.length === 1) {
      return <CountryDetails country={list[0]} />;
    } else if (list.length > 10) {
      return <div>Too many matches, specify another query</div>;
    } else {
      return <CountryList countries={list} />;
    }
  };

  return (
    <div>
      <div>
        find countries
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      {decideRender(filteredList)}
    </div>
  );
};

export default App;
