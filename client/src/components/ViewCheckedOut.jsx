import React from 'react';

const CheckedOut = () => {


  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>Checked out/Upcoming events</h1>

      {/* example search result is below */}
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Book: The Great Gatsby</p>
        </div>
        <div>
          <p>Due: 25th April</p>
        </div>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p>Event: Al's Siesta</p>
        </div>
        <div>
          <p>Date: 28th April</p>
        </div>
      </div>
    </div>
  );
};

export default CheckedOut;