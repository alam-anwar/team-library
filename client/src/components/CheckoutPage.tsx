import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function CheckoutPage() {
  const [selectedTime, setSelectedTime] = useState('');
  const [value, onChange] = useState<Value>(new Date());

  const handleButtonClick = () => {
    alert(`Checkout request sent for ${selectedTime}`);
    // You can replace the alert with your actual logic, e.g., sending a request to a server
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
          <h1>The Count of Monte Cristo</h1>
          <p>The story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815–1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France. It begins on the day that Napoleon left his first island of exile, Elba, beginning the Hundred Days period of his return to power. The historical setting is a fundamental element of the book, an adventure story centrally concerned with themes of hope, justice, vengeance, mercy, and forgiveness.</p>
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