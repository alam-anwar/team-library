import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    genre: "",
    copyNum: 0,
    versions: "",
    type: ""
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/item/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const item = await response.json();
      if (!item) {
        console.warn(`Item with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(item);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const item = { ...form };

    try {
      let response;

      //Posting new item
      if (isNew) {
        response = await fetch("http://localhost:5050/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        console.log(form);
        console.log(response);
      } else {
        // if we are updating an item we will PATCH to /item/:id.
        response = await fetch(`http://localhost:5050/item/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({
        name: "",
        location: "",
        description: "",
        genre: "",
        copyNum: 0,
        versions: "",
        type: ""
      });
    }
  }

  // Input Form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Update Item</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter location"
            value={form.location}
            onChange={(e) => updateForm({ location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
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
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Enter genre"
            value={form.genre}
            onChange={(e) => updateForm({ genre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="copyNum">Number of Copies</label>
          <input
            type="number"
            name="copyNum"
            id="copyNum"
            placeholder="Enter number of copies"
            value={form.copyNum}
            onChange={(e) => updateForm({ copyNum: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="versions">Versions</label>
          <input
            type="text"
            name="versions"
            id="versions"
            placeholder="Enter versions"
            value={form.versions}
            onChange={(e) => updateForm({ versions: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <div className="radio-group">
            <label><input
              id="typeBook"
              name="typeOptions"
              type="radio"
              value="Book"
              className="mr-1"
              checked={form.type === "Book"}
              onChange={(e) => updateForm({ type: e.target.value })}
              required
            /> Book</label>
            <label><input
              id="typeMovie"
              name="typeOptions"
              type="radio"
              value="Movie"
              className="mr-1"
              checked={form.type === "Movie"}
              onChange={(e) => updateForm({ type: e.target.value })}
            /> Movie</label>
            <label><input
              id="typeAlbum"
              name="typeOptions"
              type="radio"
              value="Album"
              className="mr-1"
              checked={form.type === "Album"}
              onChange={(e) => updateForm({ type: e.target.value })}
            /> Album</label>
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