import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    // We keep the same because the exercise said 'no duplicate names'
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, phone: newPhone }));
    setNewName('');
    setNewPhone('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.phone}
        </div>
      ))}
    </div>
  );
};

export default App;
