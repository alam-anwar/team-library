import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Item = (props) => (
  <tr>
    <td>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <div>
          <p>{props.item.type}: {props.item.name}</p>
          <p>Quantity Available: {props.item.copyNum}</p>
        </div>
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`./updateItem/${props.item._id}`}
        >
          Modify
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          type="button"
          onClick={() => {
            props.deleteItem(props.item._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function ItemList() {
  const [items, setItems] = useState([]);

  // This method fetches the items from the database.
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

  // This method will delete a item
  async function deleteItem(id) {
    await fetch(`http://localhost:5050/item/${id}`, {
      method: "DELETE",
    });
    const newItems = items.filter((el) => el._id !== id);
    setItems(newItems);
  }

  // This method will map out the items on the table
  function itemList() {
    return items.map((item) => {
      return (
        <Item
          item={item}
          deleteItem={() => deleteItem(item._id)}
          key={item._id}
        />
      );
    });
  }

  // This following section will display the table with the items of individuals.
  return (
    <table>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {itemList()}
      </tbody>
    </table>
  );
}