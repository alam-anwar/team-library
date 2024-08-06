import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { NavLink } from "react-router-dom";
import axios from 'axios'; // Import axios for API requests

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function AdminCalendar() {
  const [activeTab, setActiveTab] = useState('view');

  const renderContent = () => {
    if (activeTab === 'view') {
      return <ViewEvents />;
    } else if (activeTab === 'create') {
      return <CreateEvent />;
    } else if (activeTab === 'requests') {
      return <ViewRequests />;
    } else {
      return <ViewEvents />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          View Events
        </button>
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          Create Event Request
        </button>
        <button
          className={activeTab === 'requests' ? 'active' : ''}
          onClick={() => setActiveTab('requests')}
        >
          View Event Requests
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
      <style>
        {`
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
    </div>
  );
}

function ViewEvents() {
  const [value, onChange] = useState<Value>(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5050/admin/calendar');
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching admin calendar events", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Calendar onChange={onChange} value={value} />
        <div className="-container" style={{ marginLeft: 200 }}>
          <h2 className="event-title">Events</h2>
          <div className="event-content">
            {events.map(event => (
              <div key={event._id} style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p>Title: {event.name}</p>
                  <p>Description: {event.description}</p>
                  <p>Time: {event.startTime}</p>
                  <p>Location: {event.location}</p>
                  <p>Date: {event.date}</p>
                </div>
                <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/updateevent">
                  Modify
                </NavLink>          
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateEvent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <div className="form-group">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 text-center">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
            Event Time
          </label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 text-center">
            Event Location
          </label>
          <input
            type="text"
            id="eventLocation"
            name="eventLocation"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
            Event Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <input
          type="submit"
          value="Create Event"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
}

const ViewRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>View Event Requests</h1>
      <input
        type="text"
        placeholder="  Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '800px', border: '2px solid' }}
      />
      {/* example search result is below */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Request Sender: abbhinav.sriram@ufl.edu</p>
          <p>Event Name: Al's Siesta</p>
          <p>Description: Description Placeholder</p>
          <p>Event Date: 05/04/2029</p>
          <p>Event Time: 7:00pm</p>
          <p>Event Location: Al's House</p>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3">
        Confirm Request
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3">
        Delete Request
        </button>
      </div>
    </div>
  );
};

export default AdminCalendar;
