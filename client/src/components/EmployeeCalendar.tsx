import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


function EmployeeCalendar() {
  const [activeTab, setActiveTab] = useState('view');

  const renderContent = () => {
    if (activeTab === 'view') {
      return <ViewEvents />;
    } else if (activeTab === 'create') {
      return <CreateEvent />;
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
          <div className="event-content">
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>Title: Al's siesta</p>
              <p>Description: Placeholder description.</p>
              <p>Time: 3:00pm</p>
              <p>Location: Al's house</p>
              <p>Date: 7/30/2024</p>
            </div>
            <button style={{ backgroundColor: 'green', padding: '5px', margin: '10px', borderRadius: '5px'}}>RSVP</button>
          </div>
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
          value="Submit Request to Admin"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
}

export default EmployeeCalendar;