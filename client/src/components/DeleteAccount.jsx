import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const DeleteAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>Delete Account</h1>
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
          <p>Name: Abbhinav Sriram</p>
          <p>Email: abbhinav.sriram@ufl.edu</p>
          <p>Phone Number: 9023838489</p>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3">
        Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;