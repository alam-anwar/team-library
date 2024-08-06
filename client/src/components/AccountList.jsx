import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


const User = (props) => (
  <tr>
    <td>
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <div className="justify-items-start">
          <p>Username: {props.user.username}</p>
          <p>Account Level: {props.user.permissions}</p>
        </div>
        <div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3 mr-2"
            type="button"
            onClick={() => {
              props.deleteUser(props.user._id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </td>
  </tr>
);

export default function AccountList() {
  const [users, setUsers] = useState([]);

  // This method fetches the items from the database.
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:5050/user/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const users = await response.json();
      setUsers(users);
    }
    getUsers();
    return;
  }, [users.length]);

  // This method will delete a item
  async function deleteUser(id) {
    await fetch(`http://localhost:5050/user/${id}`, {
      method: "DELETE",
    });
    const newUsers = users.filter((el) => el._id !== id);
    setUsers(newUsers);
  }

  // This method will map out the items on the table
  function accountList() {
    return users.map((user) => {
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      );
    });
  }

  // This following section will display the table with the items of individuals.
  return (
    <table class = "min-w-full divide-y divide-gray-200">
      <tbody className="bg-white divide-y divide-gray-200">
        {accountList()}
      </tbody>
    </table>
  );
}