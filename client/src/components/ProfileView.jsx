import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function ProfileView() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  /*
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5050/user/${user.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const user = await response.json();
      if (!user) {
        console.warn(`User with id ${user.id} not found`);
        navigate("/");
        return;
      }
      setForm(user);
    }
    fetchData();
    return;
  }, [user.id, navigate]);
  */

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Your profile</h3>
      <form onSubmit={handleSubmit} className="border rounded-lg overflow-hidden p-4 w-1/2 mx-auto">
        <div className="pb-10">
          <div className="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="phone">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={form.phone_number}
              onChange={(e) => updateForm({ phone_number: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update profile</button>
      </form>
    </>
  );
}