import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { NavLink } from "react-router-dom";
import EventRequestList from './EventRequestList';
import EventEditList from './EventEditList';

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
    } else{
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
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Calendar onChange={onChange} value={value} />
        <div className="-container" style={{ marginLeft: 200}}>
          <h2 className="event-title">Events</h2>
            {EventEditList()}
        </div>
      </div>
    </div>
  );
}

function CreateEvent() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    imageLink: "",
    description: "",
    approved: true,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newEvent = { ...form };
    console.log(newEvent);

    try {
      let response;

      //Posting new record
      response = fetch("http://localhost:5050/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({
        name: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        imageLink: "",
        description: "",
        approved: true,
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img alt="Event Image" className="h-40 inline pb-10" src={form.imageLink}></img>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md text-center"
      >
        <div className="form-group">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-left"
            placeholder="Enter event name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            value={form.startTime}
            onChange={(e) => updateForm({ startTime: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
            value={form.endTime}
            onChange={(e) => updateForm({ endTime: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
            Event Location
          </label>
          <input
            type="text"
            id="eventLocation"
            name="eventLocation"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-left"
            placeholder="Enter event location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageLink" className="block text-sm font-medium text-gray-700">
            Event Image URL
          </label>
          <input
            type="text"
            id="imageLink"
            name="imageLink"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-left"
            placeholder="Enter URL for event image"
            value={form.imageLink}
            onChange={(e) => updateForm({ imageLink: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700 text-center">
            Event Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter event description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            required
          ></textarea>
        </div>

        <input
          type="submit"
          value="Submit Request to Admin"
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
      {/* Event requests displayed below */}
      {EventRequestList()}
    </div>
  );
};
export default AdminCalendar;