import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Event = (props) => (
  <tr>
    <td>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <div className="justify-items-start">
          <p>Event Name: {props.event.name}</p>
          <p>Event Location: {props.event.location}</p>
          <p>Event Time: {props.event.startTime}</p>
        </div>
        <div>
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2"
            to={`./details/${props.event._id}`}
          >
            Details
          </Link>
        </div>
      </div>
    </td>
  </tr>
);

function EventList() {
  const [events, setEvents] = useState([]);

  // This method fetches the items from the database.
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5050/event/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const events = await response.json();
      setEvents(events);
    }
    getEvents();
    return;
  }, [events.length]);

  // This method will map out the events on the table
  function eventList() {
    return events.map((event) => {
      return (
        <Event
          event={event}
          key={event._id}
        />
      );
    });
  }


  return (
    <table className = "min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {eventList()}
      </tbody>
    </table>
  );
}

export default EventList;