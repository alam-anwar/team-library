import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [loginSuccess, setLoginSuccess] = useState('');
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const comparePassword = async () => {
    try {
      const res = await axios.post('http://localhost:5050/login', { ...form });

      setLoginSuccess(res.data.loginSuccess);
      setUser(res.data.user);
    } catch (err) {
      setLoginSuccess(false);
      console.error('A problem occurred with logging in: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Pass password to backend and hash, if 
    comparePassword();

    console.log(loginSuccess);
    //If passwords match, store user id as global context (set up in app.jsx)
    if (loginSuccess) {
      const permissions = user.permissions;
      if (permissions === 'member') {
        navigate("/member/profile");
      } else if (permissions === 'employee') {
        navigate("/employee/profile");
      } else if (permissions === 'admin') {
        navigate("/admin/profile");
      }
    }

    //Get permissions and use to see where to navigate to and navigate there

  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Login</h3>
      <form onSubmit={handleSubmit} className="border rounded-lg overflow-hidden p-4 w-1/2 mx-auto">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={form.username} onChange={updateForm} />
          </div>
          <div className="form-group">
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