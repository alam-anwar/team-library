import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function CheckoutPage() {
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

  const handleButtonClick = (event) => {
    event.preventDefault();
    alert(`Checkout request sent for ${selectedTime}`);
    const serializedBody = JSON.stringify(selectedTime);
    const fetchOptions = {
        method: 'POST',
        body: serializedBody
    };
    fetch("http://localhost:5050/checkout", fetchOptions);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

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
      <div className="checkout-page">
        <h1 className="checkout-heading">Checkout</h1>
        <div className="text-container">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
        <div>
          <h1>Closest Availability: 5 days</h1>
        </div>
        <Calendar onChange={onChange} value={value} />
        <input
          type="text"
          className="time-input"
          placeholder="Enter time (e.g., 09:00 AM)"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </div>
      <button className="checkout-button" onClick={handleButtonClick}>
        Send Checkout Request
      </button>
    </>
  );
}

export default CheckoutPage;