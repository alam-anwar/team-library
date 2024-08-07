import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MemberEventList from './MemberEventList'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MemberEvents() {
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
              {MemberEventList()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberEvents;