import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function InventoryDetails() {
  const [selectedTime, setSelectedTime] = useState('');
  const [value, onChange] = useState<Value>(new Date());
  const [item, setItem] = useState({
    name: "",
    location: "",
    description: "",
    genre: "",
    copyNum: 0,
    versions: "",
    type: ""
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await fetch(
        `http://localhost:5050/item/${id}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const item = await response.json();
      if (!item) {
        console.warn(`Item with id ${id} not found`);
        navigate("/");
        return;
      }
      setItem(item);
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
          .checkout-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding-bottom: 60px; /* Space for the button at the bottom */
          }

          .checkout-button {
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

          .checkout-button:hover {
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

          .checkout-heading {
            font-size: 1.25em; /* Larger font size for the Checkout heading */
            margin-bottom: 5px; /* Space below the heading */
          }
        `}
      </style>
      <body className="bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">{item.name}</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{item.type}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-gray-700">{item.location}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Genre</h2>
            <p className="text-gray-700">{item.genre}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Number of Copies Available</h2>
            <p className="text-gray-700">{item.copyNum}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Versions</h2>
            <p className="text-gray-700">{item.versions}</p>
          </div>
        </div>
      </body>
      <button className="checkout-button" onClick={navigateToLogin}>
        Login to Checkout
      </button>
    </>
  );
}

export default InventoryDetails;