import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonDetails = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    // We keep the same because the exercise said 'no duplicate names'
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newPhone }));
    setNewName('');
    setNewPhone('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={onSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
