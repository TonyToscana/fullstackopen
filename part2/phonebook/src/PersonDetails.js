import React from 'react';

const PersonDetails = ({ person, onDeleteClick }) => {
  return (
    <div>
      {person.name} {person.number}{' '}
      <button onClick={onDeleteClick}>delete</button>
    </div>
  );
};

export default PersonDetails;
