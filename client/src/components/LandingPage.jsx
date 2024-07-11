import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <style>
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      </style>
      <div style={{ 
        padding: '25px', // Increased padding
        width: '600px', // Increased maxWidth for a bigger box
        margin: '20px', 
        backgroundColor: "#98FB98",
        textAlign: 'center',
        }}>
        <h2 style={{ fontSize: '24px' }}>Upcoming events</h2>
        <p style={{ fontSize: '14px' }}>There are no upcoming events.</p>
      </div>
      <div style={{ 
            padding: '25px', // Increased padding
            width: '600px', // Increased maxWidth for a bigger box
            margin: '20px', 
            textAlign: 'center', 
            backgroundColor: "#98FB98",
            float: 'right'
          }}>
            <h2 style={{ fontSize: '24px' }}>Checked out items</h2>
            <p style={{ fontSize: '14px' }}>The Count of Monte Cristo: Due 9/21/2024</p>
      </div>
    
    </div>
    
    

    
  );
};

export default LandingPage;