import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryListItem = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      {country.name.common}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>show</button>
      {showDetails ? <CountryDetails country={country} /> : ''}
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <CountryListItem key={country.cioc} country={country} />
      ))}
    </>
  );
};

const WeatherDetails = ({ lat, lng }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherInfo(response.data);
      });
  }, [apiKey, lat, lng]);

  // solution from https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
  const getWindDirection = (deg) => {
    const val = Math.trunc(deg / 22.5 + 0.5);
    const arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];

    return arr[val % 16];
  };

  return (
    <>
      {weatherInfo ? (
        <>
          <div>
            <b>temperature: </b>
            {weatherInfo?.main?.temp} Celsius
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}@4x.png`}
            alt="Weather pic"
          />
          <div>
            <b>wind: </b>
            {weatherInfo?.wind?.speed} m/s direction{' '}
            {getWindDirection(weatherInfo?.wind?.deg)}
          </div>
        </>
      ) : (
        <div>No weather info</div>
      )}
    </>
  );
};

const CountryDetails = ({ country }) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  const capitalName = country.capital[0];
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {capitalName}</div>
      <div>population {country.population}</div>
      <h3>Spoken languages</h3>
      <ul>
        {Object.values(country.languages).map((lan) => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt="Country flag"
        height={100}
        width={100}
      />
      <h3>Weather in {capitalName}</h3>
      <WeatherDetails lat={lat} lng={lon} />
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
