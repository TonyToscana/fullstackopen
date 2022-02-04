import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const color = notification.type === 'error' ? 'red' : 'green';

  const notificationStyle = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;
