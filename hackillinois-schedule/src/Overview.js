//Created with the help of ChatGPT

import React, { useEffect, useState } from "react";
import Schedule from "./Schedule";

function Overview() {
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null); // Set initially to null bc we want default view

  useEffect(() => {
    fetch("https://adonix.hackillinois.org/event/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const formatDate = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleTimeString(undefined, options);
  };

  const formatLocations = (locations) => {
    return locations.map((location) => location.description).join(", ");
  };

  const getDateColor = (date) => {
    const dateColors = {
        'Feb 24, 2023': '#d62828',
        'Feb 25, 2023': '#f77f00',
        'Feb 26, 2023': '#fca311',
      };

    return dateColors[date] || "hsl(120, 70%, 80%)"; 
  };

  const filteredEvents = data
    ? selectedDay
      ? data.events
          .filter((event) => formatDate(event.startTime) === selectedDay)
          .sort((a, b) => a.startTime - b.startTime)
      : [] // return an empty array if no day is selected
    : [];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 mb-4">
          <h3>HackIllinois Schedule</h3>
          <button
            className={`btn ${
              selectedDay === "Friday" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedDay("Feb 24, 2023")}
          >
            Friday
          </button>
          <button
            className={`btn ${
              selectedDay === "Saturday" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedDay("Feb 25, 2023")}
          >
            Saturday
          </button>
          <button
            className={`btn ${
              selectedDay === "Sunday" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedDay("Feb 26, 2023")}
          >
            Sunday
          </button>
          <button
            className={`btn ${
              selectedDay === "Sunday" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedDay(null)} // Set selectedDay to null to load Schedule component
          >
            Overview
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {selectedDay ? (
            <>
              <h3>{selectedDay}</h3>
              {filteredEvents.map((event) => (
                <div key={event.id} className="mb-4">
                  <div
                    className="card"
                    style={{
                      backgroundColor: getDateColor(
                        formatDate(event.startTime)
                      ),
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title">{event.name}</h3>
                      <p className="card-text">
                        <strong>Date:</strong> {formatDate(event.startTime)}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong> {formatTime(event.startTime)} -{" "}
                        {formatTime(event.endTime)}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong>{" "}
                        {formatLocations(event.locations)}
                      </p>
                      <p className="card-text">
                        <strong>Description:</strong> {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Schedule />
          )}
        </div>
      </div>
    </div>
  );
}

export default Overview;
