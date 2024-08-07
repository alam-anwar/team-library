import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { NavLink, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import ItemList from "./InventoryEditList"

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


function EditInventory() {
  const [activeTab, setActiveTab] = useState('view');

  const renderContent = () => {
    if (activeTab === 'view') {
      return <ViewInventory />;
    } else if (activeTab === 'add') {
      return <ItemForm />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          View Inventory
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Inventory
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

function ViewInventory() {
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
      <h1 style={{ fontSize: '2em' }}>Inventory Manager</h1>
      <input
        type="text"
        placeholder="Search..."
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

      {/* List of all items from InventoryEditList */}      
      {ItemList()}

    </div>
  );
}

export default EditInventory;