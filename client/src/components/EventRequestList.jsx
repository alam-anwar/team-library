import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


const Event = (props) => (
  <tr>
    <td>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <div className="justify-items-start">
          <p>Request Sender: abbhinav.sriram@ufl.edu (fix later)</p>
          <p>Event Name: {props.event.name}</p>
          <p>Event Date: {props.event.date}</p>
          <p>Event Time: {props.event.startTime}</p>
          <p>Event Location: {props.event.location}</p>
        </div>
        <div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2"
            type="button"
            onClick={() => {
              props.approveEvent(props.event._id);
            }}
          >
            Approve Request
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2"
            type="button"
            onClick={() => {
              props.deleteEvent(props.event._id);
            }}
          >
            Deny Request
          </button>
        </div>
      </div>
    </td>
  </tr>
);

export default function EventRequestList() {
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

  // This method will approve the event
  async function approveEvent(id) {
    const eventApproval = {
      approved: true,
    };

    try {
      let response;
      
      // if we are updating an item we will PATCH to /item/:id.
      response = await fetch(`http://localhost:5050/event/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventApproval),
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    }
  }

  // This method will delete an event
  async function deleteEvent(id) {
    await fetch(`http://localhost:5050/event/${id}`, {
      method: "DELETE",
    });
    const newEvents = events.filter((el) => el._id !== id);
    setEvents(newEvents);
  }

  // This method will check whether the event has been approved or not
  async function isApproved(id) {
    const response = await fetch(
      `http://localhost:5050/event/${id.toString()}`
    );
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
      return false;
    }
    const event = await response.json();
    if (!event) {
      console.warn(`Event with id ${id} not found`);
      navigate("/");
      return false;
    }

    console.log(event._id);
    console.log(event.approved);
    return event.approved;
  }

  // This method will map out the events on the table
  function eventList() {
    return events.map((event) => {
      return (
        <Event
          event={event}
          approveEvent={() => approveEvent(event._id)}
          deleteEvent={() => deleteEvent(event._id)}
          key={event._id}
        />
      );
    });
  }

  // This following section will display the table with the events in the system.
  return (
    <table class = "min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {eventList()}
      </tbody>
    </table>
  );
}