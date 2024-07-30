import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventsPage() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <style>
        {`
          .event-container {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .event-title {
            font-size: 2em; /* Make the heading bigger */
          }

          .event-content {
            display: flex;
            justify-content: flex-end; /* Move text and button to the right */
            width: 100%;
            align-items: center;
          }

          .event-text {
            margin-right: 20px;
          }

          .event-button {
            background-color: green;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
          }

          .event-button:hover {
            background-color: darkgreen;
          }
        `}
      </style>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Calendar onChange={onChange} value={value} />
        <div className="event-container" style={{ marginLeft: 300}}>
          <h2 className="event-title">Events</h2>
          <div className="event-content">
            <h1 className="event-text">Al's siesta</h1>
            <button className="event-button">RSVP</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;