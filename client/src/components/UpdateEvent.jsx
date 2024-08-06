import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function UpdateEvent() {
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
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/event/${params.id.toString()}`
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
      setForm(event);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const event = { ...form };

    try {
      let response;

      // if we are updating an event we will PATCH to /event/:id.
      response = await fetch(`http://localhost:5050/event/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
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
          value="Update Event"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </div>
  );
}


export default UpdateEvent;