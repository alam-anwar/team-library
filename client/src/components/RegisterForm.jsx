import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
  });
  const navigate = useNavigate();

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const isNew = useParams().id == undefined;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { ...form };
    newUser.permissions = "member";

    try {
      let response;

      //Posting new record
      response = await fetch("http://localhost:5050/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ username: "", email: "", password: "", phone_number: ""});
      navigate("/profile");
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Register</h3>
      <form onSubmit={handleSubmit} className="border rounded-lg overflow-hidden p-4 w-1/2 mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-slate-900">Username</label>
            <input type="text" name="username" id="username" value={form.username} onChange={updateForm} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Email</label>
            <input type="email" name="email" id="email" value={form.email} onChange={updateForm} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center" />
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-slate-900">Phone Number</label>
            <input type="phone_number" name="phone_number" id="phone_number" value={form.phone_number} onChange={updateForm} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">Password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={updateForm} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center" />
          </div>

        </div>
        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
        <div>
          <button onClick={navigateToLogin} className="mt-4 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline">
            Have an account? Log in
          </button>
        </div>
      </form>
    </>
  );
}