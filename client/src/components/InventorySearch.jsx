import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";

const Item = (props) => (
  <tr>
    <td>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div className="justify-items-start">
          <p>{props.item.type}: {props.item.name}</p>
          <p>Quantity Available: {props.item.copyNum}</p>
        </div>
        <Link className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2"
              to={`./checkout/${props.item._id}`}>
          Details
        </Link>
      </div>
    </td>
  </tr>
);

const InventorySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const response = await fetch(`http://localhost:5050/item/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const items = await response.json();
      setItems(items);
    }
    getItems();
    return;
  }, [items.length]);

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

  function itemList() {
    return items.map((item) => {
      return (
        <Item
          item={item}
          key={item._id}
        />
      );
    });
  }

  return (
    <div>
      <h1 style={{ fontSize: '2em' }}>Inventory Search</h1>
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

      {/* List of items */}
      <table class = "min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {itemList()}
        </tbody>
      </table>
    </div>
  );
};

export default InventorySearch;