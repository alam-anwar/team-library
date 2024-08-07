import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { NavLink, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import AccountList from "./AccountList"

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


function AccountManager() {
  const [activeTab, setActiveTab] = useState('view');

  const renderContent = () => {
    if (activeTab === 'view') {
      return <ViewAccounts />;
    } else if (activeTab === 'add') {
      return <CreateAccount />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'view' ? 'active' : ''}
          onClick={() => setActiveTab('view')}
        >
          View Accounts
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Account
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

function ViewAccounts() {
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
      <h1 style={{ fontSize: '2em' }}>Account Manager</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '800px', border: '2px solid' }}
      />

      {/* List of all items from InventoryEditList */}      
      {AccountList()}

    </div>
  );
}

export default AccountManager;