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
    navigate("/");
  };

  // Input Form
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Item</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="list-none list-inside leading-10 text-base font-semibold text-slate-900 text-right">
              <li>Name</li>
              <li>Location</li>
              <li>Description</li>
              <br></br>
              <br></br>
              <li>Genre</li>
              <li>Number of Copies</li>
              <li>Versions</li>
              <li>Type</li>
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6">
            <div className="sm:col-span-4">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter location"
                    value={form.location}
                    onChange={(e) => updateForm({ location: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="h-24  flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    type="textarea"
                    name="description"
                    id="description"
                    className="block resize-none flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter genre"
                    value={form.genre}
                    onChange={(e) => updateForm({ genre: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="copyNum"
                    id="copyNum"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter number of copies"
                    value={form.copyNum}
                    onChange={(e) => updateForm({ copyNum: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="versions"
                    id="versions"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter versions"
                    value={form.versions}
                    onChange={(e) => updateForm({ versions: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Types</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="typeBook"
                      name="typeOptions"
                      type="radio"
                      value="Book"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "Book"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label
                      htmlFor="typeBook"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Book
                    </label>
                    <input
                      id="typeDVD"
                      name="typeOptions"
                      type="radio"
                      value="DVD"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "DVD"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label
                      htmlFor="typeDVD"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      DVD
                    </label>
                    <input
                      id="typeCD"
                      name="typeOptions"
                      type="radio"
                      value="CD"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.type === "CD"}
                      onChange={(e) => updateForm({ type: e.target.value })}
                    />
                    <label
                      htmlFor="typeCD"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      CD
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Item"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}