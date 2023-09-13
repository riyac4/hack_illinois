import React, { useEffect, useState } from 'react';

function Schedule() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://adonix.hackillinois.org/event/')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const formatDate = epochTime => {
    const date = new Date(epochTime * 1000);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = epochTime => {
    const date = new Date(epochTime * 1000);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleTimeString(undefined, options);
  };

  const formatLocations = locations => {
    return locations.map(location => location.description).join(', ');
  };

  const getDateColor = date => {
    // Define specific background colors for certain dates
    const dateColors = {
      'Feb 24, 2023': 'hsl(0, 70%, 80%)',
      'Feb 25, 2023': 'hsl(30, 70%, 80%)',
      'Feb 26, 2023': 'hsl(90, 70%, 80%)',
    };

    return dateColors[date] || 'hsl(120, 70%, 80%)'; // Default color (green)
  };

  // Separate events by day
  const fridayEvents = data
  ? data.events
      .filter(event => formatDate(event.startTime) === 'Feb 24, 2023')
      .sort((a, b) => a.startTime - b.startTime)
  : [];
const saturdayEvents = data
  ? data.events
      .filter(event => formatDate(event.startTime) === 'Feb 25, 2023')
      .sort((a, b) => a.startTime - b.startTime)
  : [];
const sundayEvents = data
  ? data.events
      .filter(event => formatDate(event.startTime) === 'Feb 26, 2023')
      .sort((a, b) => a.startTime - b.startTime)
  : [];
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h3>Friday</h3>
          <h3>Feb 24 2023</h3>
          {fridayEvents.map(event => (
            <div key={event.id} className="mb-4">
              <div className="card" style={{ backgroundColor: getDateColor(formatDate(event.startTime)) }}>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {formatDate(event.startTime)}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {formatLocations(event.locations)}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h3>Saturday</h3>
          <h3>Feb 25 2023</h3>
          {saturdayEvents.map(event => (
            <div key={event.id} className="mb-4">
              <div className="card" style={{ backgroundColor: getDateColor(formatDate(event.startTime)) }}>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {formatDate(event.startTime)}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {formatLocations(event.locations)}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h3>Sunday</h3>
          <h3>Feb 26 2023</h3>
          {sundayEvents.map(event => (
            <div key={event.id} className="mb-4">
              <div className="card" style={{ backgroundColor: getDateColor(formatDate(event.startTime)) }}>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {formatDate(event.startTime)}
                  </p>
                  <p className="card-text">
                    <strong>Time:</strong> {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {formatLocations(event.locations)}
                  </p>
                  <p className="card-text">
                    <strong>Description:</strong> {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
