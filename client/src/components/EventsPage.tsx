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


          .tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }

          .tabs button {
            padding: 10px 20px;
            margin: 0 10px;
            cursor: pointer;
            border: none;
            background-color: #f0f0f0;
            border-radius: 5px;
          }

          .tabs button.active {
            background-color: #007bff;
            color: white;
          }

          .tab-content {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          

          .event-title {
            font-size: 2em; /* Make the heading bigger */
          }
          
          .event-container {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        `}
      </style>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Calendar onChange={onChange} value={value} />
          <div className="-container" style={{ marginLeft: 200}}>
            <h2 className="event-title">Events</h2>
            <div className="event-content">
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p>Title: Al's siesta</p>
                <p>Description: Al takes a nice short nap on the couch</p>
                <p>Time: 3:00pm</p>
              </div>
              <button style={{ backgroundColor: 'green', padding: '5px', margin: '10px', borderRadius: '5px'}}>RSVP</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;