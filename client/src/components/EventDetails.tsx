import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventDetails() {
  const [selectedTime, setSelectedTime] = useState('');
  const [value, onChange] = useState<Value>(new Date());
  const [event, setEvent] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    imageLink: "",
    description: "",
    approved: true,
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await fetch(
        `http://localhost:5050/event/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const event = await response.json();
      if (!event) {
        console.warn(`Event with id ${id} not found`);
        navigate("/");
        return;
      }
      setEvent(event);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  const navigateToLogin = (event) => {
    navigate('/login');
  }

  return (
    <>
      <style>
        {`
          .rsvp-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding-bottom: 60px; /* Space for the button at the bottom */
          }

          .rsvp-button {
            border: 2px solid black; /* Add an outline */
            background-color: white;
            color: black;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          }

          .rsvp-button:hover {
            background-color: lightgray;
          }

          .time-input {
            margin-left: 10px;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid black;
          }

          .text-container {
            margin: 60px;
            text-align: center;
          }

          .rsvp-heading {
            font-size: 1.25em; /* Larger font size for the RSVP heading */
            margin-bottom: 5px; /* Space below the heading */
          }
        `}
      </style>
      <body className="bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <img alt="Event Image" className="inline pb-10" src={event.imageLink}></img>
          <h1 className="text-3xl font-bold mb-6 text-center">{event.name}</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-gray-700">{event.location}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Date</h2>
            <p className="text-gray-700">{event.date}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Time</h2>
            <p className="text-gray-700">{event.startTime} - {event.endTime}</p>
          </div>
        </div>
      </body>
      <button className="rsvp-button" onClick={navigateToLogin}>
        Login to RSVP
      </button>
    </>
  );
}

export default EventDetails;