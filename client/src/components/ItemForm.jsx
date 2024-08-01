import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Item() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    genre: "",
    copyNum: 0,
    versions: "",
    type: ""
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
    navigateToHome();
    console.log(form);
  }

  const navigateToHome = () => {
    navigate("/modifyinventory");
  };

  // Input Form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Update Item</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            rows="4"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="genre">Genre</label>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Enter genre"
            value={form.genre}
            onChange={(e) => updateForm({ genre: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="copyNum">Number of Copies</label>
          <input
            type="number"
            name="copyNum"
            id="copyNum"
            placeholder="Enter copyNum"
            value={form.copyNum}
            onChange={(e) => updateForm({ copyNum: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label for="versions">Versions</label>
          <input
            type="text"
            name="versions"
            id="versions"
            placeholder="Enter versions"
            value={form.versions}
            onChange={(e) => updateForm({ versions: e.target.value })}
          />
        </div>
        <div class="form-group">
          <label>Type</label>
          <div class="radio-group">
            <label><input
              id="typeBook"
              name="typeOptions"
              type="radio"
              value="book"
              className="mr-1"
              checked={form.type === "book"}
              onChange={(e) => updateForm({ type: e.target.value })}
            /> Book</label>
            <label><input
              id="typeDvd"
              name="typeOptions"
              type="radio"
              value="dvd"
              className="mr-1"
              checked={form.type === "dvd"}
              onChange={(e) => updateForm({ type: e.target.value })}
            /> DVD</label>
            <label><input
              id="typeCd"
              name="typeOptions"
              type="radio"
              value="cd"
              className="mr-1"
              checked={form.type === "cd"}
              onChange={(e) => updateForm({ type: e.target.value })}
            /> CD</label>
          </div>
        </div>
        <input
          type="submit"
          value="Save Item"
          className="inline-flex items-center justify-center font-medium border h-9 rounded-md px-3 cursor-pointer mt-4 border-gray-400"
        />
      </form>
    </>
  );
}