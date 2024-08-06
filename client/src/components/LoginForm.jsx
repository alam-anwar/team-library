import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

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

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Login</h3>
      <form onSubmit={handleSubmit} className="border rounded-lg overflow-hidden p-4 w-1/2 mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12">
          <div class="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" value={form.email} onChange={updateForm} />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={updateForm} />
          </div>

        </div>
        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
        <div>
          <button onClick={navigateToRegister} className="mt-4 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline">
            Don't have an account? Register
          </button>
        </div>
      </form>
    </>
  );
}