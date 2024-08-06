import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateMember() {
  const [form, setForm] = useState({
    username: "",
    email:"",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const newUser = { ...form };
    newUser.permissions = "member";

    try {
      let response;

      //Posting new record
      response = fetch("http://localhost:5050/user", {
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
    }
  }

  const navigateToHome = () => {
    navigate("/");
  };

  // Input Form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Add Member</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Enter phone number"
            rows="4"
            value={form.phone_number}
            onChange={(e) => updateForm({ phone_number: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <input
          type="submit"
          value="Add New Member"
          className="inline-flex items-center justify-center font-medium border h-9 rounded-md px-3 cursor-pointer mt-4 border-gray-400"
        />
      </form>
    </>
  );
}