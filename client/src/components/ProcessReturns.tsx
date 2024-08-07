import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { NavLink } from "react-router-dom";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


function ProcessReturns() {
  const [activeTab, setActiveTab] = useState('view');
  

  const renderContent = () => {
    if (activeTab === 'requests') {
      return <ViewRequests />;
    } else if (activeTab === 'returns') {
      return <ViewReturns />;
    } else {
      setActiveTab('requests');
      return <ViewRequests />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'requests' ? 'active' : ''}
          onClick={() => setActiveTab('requests')}
        >
          View Checkout Requests
        </button>
        <button
          className={activeTab === 'returns' ? 'active' : ''}
          onClick={() => setActiveTab('returns')}
        >
          View Returns
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

function ViewRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Reset genre when changing category so that it doesn't affect electronics searches
    setSelectedGenre('');
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    // Perform filtering logic here based on selected genre
  };
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>View Requests</h1>
      <input
        type="text"
        placeholder="  Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '800px', border: '2px solid' }}
      />
      {/* First type of dropdown, so that filters for books don't apear for electronics */}
      <select value={selectedCategory} onChange={handleCategoryChange} style={{ marginLeft: '10px', padding: '10px', border: '2px solid' }}>
        <option value="">Select Category</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>

      {/* Only appears if the user selects books (in the requirements I think) */}
      {selectedCategory === 'books' && (
        <select value={selectedGenre} onChange={handleGenreChange} style={{ marginLeft: '10px', padding: '10px', border: '2px solid' }}>
          <option value="">Select Genre</option>
          <option value="fantasy">Fantasy</option>
          <option value="mystery">Mystery</option>
          <option value="science-fiction">Science Fiction</option>
          {/* Add more genres as needed */}
        </select>
      )}

      {/* example search result is below */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Book: The Great Gatsby</p>
          <p>Quantity Available: 5</p>
          <p>Date requested: 7/25/2025</p>
          <p>Time Requested: 4:00pm</p>
          <p>Name: Abbhinav Sriram</p>
        </div>
        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/checkout">
        Process Checkout
        </NavLink>
      </div>
    </div>
  );
}

function ViewReturns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isReturned, setIsReturned] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Reset genre when changing category so that it doesn't affect electronics searches
    setSelectedGenre('');
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    // Perform filtering logic here based on selected genre
  };

  const handleReturnClick = () => {
    setIsReturned(true);
  };

  const [value, onChange] = useState<Value>(new Date());
  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>Process Returns</h1>
      <input
        type="text"
        placeholder="  Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '800px', border: '2px solid' }}
      />
      {/* First type of dropdown, so that filters for books don't apear for electronics */}
      <select value={selectedCategory} onChange={handleCategoryChange} style={{ marginLeft: '10px', padding: '10px', border: '2px solid' }}>
        <option value="">Select Category</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>

      {/* Only appears if the user selects books (in the requirements I think) */}
      {selectedCategory === 'books' && (
        <select value={selectedGenre} onChange={handleGenreChange} style={{ marginLeft: '10px', padding: '10px', border: '2px solid' }}>
          <option value="">Select Genre</option>
          <option value="fantasy">Fantasy</option>
          <option value="mystery">Mystery</option>
          <option value="science-fiction">Science Fiction</option>
          {/* Add more genres as needed */}
        </select>
      )}

      {/* example search result is below */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Book: The Great Gatsby</p>
          <p>Quantity Available: 5</p>
          <p>Date to return: 7/25/2025</p>
          <p>Time to return: 4:00pm</p>
          <p>Name: Abbhinav Sriram</p>
        </div>
        <button
          className={`inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 ${isReturned ? 'bg-green-500 text-white' : ''}`}
          onClick={handleReturnClick}
        >
          {isReturned ? 'Returned' : 'Process Return'}
        </button>
      </div>
    </div>
  );
}

export default ProcessReturns;