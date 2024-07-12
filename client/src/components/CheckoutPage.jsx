import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="image-container" style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <img src="https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-desktop-background-1691.jpg" alt="Nature Background" style={{ width: '50%' }} />
        <div className="text-container" style={{margin: '60px'}} >
          <h2>The Count of Monte Cristo</h2>
          <p>The story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815–1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France. It begins on the day that Napoleon left his first island of exile, Elba, beginning the Hundred Days period of his return to power. The historical setting is a fundamental element of the book, an adventure story centrally concerned with themes of hope, justice, vengeance, mercy, and forgiveness.</p>
      </div>
      
    </div>
    <button className="checkout-button">Send Checkout Request</button>
  </div>
  );
};

export default CheckoutPage;