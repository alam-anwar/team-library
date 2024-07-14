import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Item from "./components/Item";
import ItemList from "./components/ItemList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />, //Will be ItemList
      },
      {
        path: "/edit/:id",
        element: <Record />,
      },
      {
        path: "/signup",
        element: <Record />,
      },
      {
        path: "/create",
        element: <Item />, //Will be ItemForm??
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);