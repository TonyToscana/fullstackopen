import React, { useEffect, useState } from 'react';
import personService from './services/persons/personService';
import Filter from './Filter';
import PersonForm from './PersonForm';
import PersonDetails from './PersonDetails';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((retrievedPersons) => {
      setPersons(retrievedPersons);
    });
  }, []);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 2000);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson === undefined) {
      personService
        .create({ name: newName, number: newPhone })
        .then((createdPerson) => {
          showNotification(`Added ${createdPerson.name}`);
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewPhone('');
        })
        .catch(() => alert('Error adding person'));
    } else {
      if (
        window.confirm(
          `${foundPerson.name} is already added to the phonebook, replace old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson.id, {
            ...foundPerson,
            number: newPhone,
          })
          .then((updatedPerson) => {
            showNotification(
              `Updated ${updatedPerson.name} phone number to ${updatedPerson.number}`
            );
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewName('');
            setNewPhone('');
          })
          .catch(() => alert('Could not update person'));
      }
    }
  };

  const onDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => alert('Could not delete person'));
    }
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
      <Notification message={notificationMessage} />
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
        <PersonDetails
          key={person.name}
          person={person}
          onDeleteClick={() => onDeletePerson(person)}
        />
      ))}
    </div>
  );
};

export default App;
